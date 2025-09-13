import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search")?.trim() || "";

    const skip = (page - 1) * limit;

    // Build search filters
    const filters = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];

    // Only add role filter if search is "ADMIN" or "USER"
    if (["ADMIN", "USER"].includes(search.toUpperCase())) {
      filters.push({ role: { equals: search.toUpperCase() } });
    }

    // Count total users
    const totalUsers = await prisma.user.count({
      where: { OR: filters },
    });

    // Fetch only required columns
    const users = await prisma.user.findMany({
      where: { OR: filters },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({ users, totalUsers, page, limit });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
