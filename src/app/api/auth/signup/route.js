import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, email, password, referralCode } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // ✅ Initialize referrer ID
    let referrerId = null;

    // ✅ If referral code is provided, verify it
    if (referralCode && referralCode.trim() !== "") {
      const cleanedCode = referralCode.trim().toUpperCase();

      const referrer = await prisma.user.findUnique({
        where: { referralCode: cleanedCode },
        select: { id: true },
      });

      if (!referrer) {
        return NextResponse.json(
          { error: "Invalid referral code" },
          { status: 400 }
        );
      }

      referrerId = referrer.id;
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Generate unique referral code for the new user
    const userReferralCode = crypto.randomBytes(3).toString("hex").toUpperCase(); // e.g. "A1B2C3"

    // ✅ Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        referralCode: userReferralCode,
        referredById: referrerId, // ✅ Correct variable here
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        referralCode: true,
        referredById: true,
      },
    });

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Set cookie
    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // ✅ Return success
    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201, headers: { "Set-Cookie": serialized } }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
