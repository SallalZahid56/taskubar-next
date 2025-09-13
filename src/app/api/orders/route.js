import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ Get orders with pagination + search + filters
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // ✅ Fetch orders with user info
    const orders = await prisma.serviceRequest.findMany({
      where: {
        OR: [
          { service: { contains: search, mode: "insensitive" } },
          { topic: { contains: search, mode: "insensitive" } },
          { user: { name: { contains: search, mode: "insensitive" } } },
        ],
      },
      include: { user: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalOrders = await prisma.serviceRequest.count({
      where: {
        OR: [
          { service: { contains: search, mode: "insensitive" } },
          { topic: { contains: search, mode: "insensitive" } },
          { user: { name: { contains: search, mode: "insensitive" } } },
        ],
      },
    });

    return NextResponse.json({ orders, totalOrders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
