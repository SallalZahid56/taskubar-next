import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ Helper: extract user from /api/auth/me logic
async function getUserFromRequest(req) {
  const res = await fetch(`${req.nextUrl.origin}/api/auth/me`, {
    headers: { cookie: req.headers.get("cookie") || "" },
    cache: "no-store", // avoid caching
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.serviceRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch user orders" },
      { status: 500 }
    );
  }
}
