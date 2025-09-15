import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { id } = params;

    const updated = await prisma.serviceRequest.update({
      where: { id },
      data: {
        status: "Pending",
        quotation: null,
        invoiceSent: false,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Error resetting order:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
