import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  try {
    const { code } = await req.json();
    const orderId = params.id;

    // 1. Find voucher
    const voucher = await prisma.voucher.findUnique({
      where: { code },
    });

    if (!voucher) {
      return NextResponse.json(
        { error: "Invalid voucher code" },
        { status: 400 }
      );
    }

    // 2. Find order + ensure quotation exists
    const order = await prisma.serviceRequest.findUnique({
      where: { id: orderId },
    });

    if (!order || !order.quotation) {
      return NextResponse.json(
        { error: "Order not found or quotation missing" },
        { status: 404 }
      );
    }

    const quotationAmount = parseFloat(order.quotation);

    // 3. Calculate discounted amount
    const discountPercent = voucher.discount;
    const discountedAmount =
      quotationAmount - (quotationAmount * discountPercent) / 100;

    // 4. Update order
    const updatedOrder = await prisma.serviceRequest.update({
      where: { id: orderId },
      data: {
        voucherCode: code,        // Save voucher applied
        discount: discountedAmount, // Save discounted price
      },
    });

    return NextResponse.json({
      message: "Voucher applied successfully",
      originalQuotation: quotationAmount,
      discountPercent,
      discountedAmount,
      voucher: voucher.code,
      updatedOrder,
    });

  } catch (err) {
    console.error("Voucher error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
