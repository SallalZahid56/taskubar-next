import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ Delete user by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

// ✅ Update user role (toggle USER/ADMIN)
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { role } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}
