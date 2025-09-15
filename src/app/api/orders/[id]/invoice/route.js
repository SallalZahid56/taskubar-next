import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  try {
    const { params } = await context; // ✅ FIX
    const { id } = params;

    const updated = await prisma.serviceRequest.update({
      where: { id },
      data: {
        invoiceSent: true,
        status: "Invoice Sent",
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Error generating invoice:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
