import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  try {
    const orderId = params.id;

    // Update both: status + invoiceSent
    const updatedOrder = await prisma.serviceRequest.update({
      where: { id: orderId },
      data: {
        status: "Invoice Requested",
        invoiceSent: true,
      },
    });

    return NextResponse.json({
      message: "Invoice ready",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Invoice creation error:", error);
    return NextResponse.json(
      { error: "Error processing invoice" },
      { status: 500 }
    );
  }
}
