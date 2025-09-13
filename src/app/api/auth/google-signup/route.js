// src/app/api/auth/google-signup/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { token } = await req.json(); // Google ID token from frontend

    if (!token) {
      return NextResponse.json({ error: "Missing Google token" }, { status: 400 });
    }

    // ✅ Verify Google token with Google servers
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const googleUser = await googleRes.json();

    if (googleUser.error_description) {
      return NextResponse.json({ error: "Invalid Google token" }, { status: 401 });
    }

    // ✅ Upsert user into DB
    const user = await prisma.user.upsert({
      where: { email: googleUser.email },
      update: {}, // If user exists, just return it
      create: {
        name: googleUser.name || "Google User",
        email: googleUser.email,
        password: "", // leave empty (Google handles authentication)
        role: "USER",
      },
      select: { id: true, name: true, email: true, role: true },
    });

    // ✅ Issue JWT for your app
    const appToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const serialized = serialize("token", appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { message: "Google signup successful", user },
      { status: 200, headers: { "Set-Cookie": serialized } }
    );
  } catch (err) {
    console.error("Google signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
