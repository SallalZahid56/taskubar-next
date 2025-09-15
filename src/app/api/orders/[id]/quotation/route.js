// app/api/orders/[id]/quotation/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { id } = params; // ✅ no await needed
    const { quotation } = await req.json();

    const updated = await prisma.serviceRequest.update({
      where: { id },
      data: {
        quotation,
        status: "Quotation Sent",
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Error saving quotation:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
