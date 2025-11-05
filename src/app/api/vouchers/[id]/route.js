import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Delete a voucher by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.voucher.delete({ where: { id } });

    return NextResponse.json({ message: "Voucher deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting voucher:", error);
    return NextResponse.json({ error: "Failed to delete voucher" }, { status: 500 });
  }
}
