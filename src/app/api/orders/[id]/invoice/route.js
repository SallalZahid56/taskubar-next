import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

/* ---------------------------------------------
   POST → Marks invoice as generated
---------------------------------------------- */
export async function POST(req, context) {
  try {
    const { params } = await context;
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

/* ---------------------------------------------
   GET → Download PDF invoice (Modern & Attractive)
---------------------------------------------- */
export async function GET(req, context) {
  try {
    const { params } = await context;
    const orderId = params.id;

    // Fetch order
    const order = await prisma.serviceRequest.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!order.voucherCode || !order.invoiceSent) {
      return NextResponse.json(
        { error: "Invoice not available" },
        { status: 400 }
      );
    }

    // Load voucher info
    const voucher = await prisma.voucher.findUnique({
      where: { code: order.voucherCode },
    });

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 900]);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 850;

    // Header: Gradient-like effect with brand color
    page.drawRectangle({ x: 0, y: 820, width: 600, height: 60, color: rgb(0.2, 0.3, 0.8) });
    page.drawText("TaskUber Invoice", { x: 40, y: 835, size: 28, font: fontBold, color: rgb(1, 1, 1) });

    y = 780;

    const drawText = (text, size = 16, color = rgb(0, 0, 0), bold = true, x = 40) => {
      page.drawText(text, { x, y, size, font: bold ? fontBold : fontRegular, color });
      y -= size + 8;
    };

    const drawLine = (yPos, color = rgb(0.7, 0.7, 0.7)) => {
      page.drawLine({ start: { x: 40, y: yPos }, end: { x: 560, y: yPos }, thickness: 1, color });
    };

    const drawBox = (x, yTop, width, height, fillColor = rgb(0.95, 0.95, 0.95)) => {
      page.drawRectangle({ x, y: yTop - height, width, height, color: fillColor, borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 1 });
    };

    // Order / Project info
    drawText(`Project / Service: ${order.service}`, 20, rgb(0.1, 0.1, 0.1));
    drawText(`Order ID: ${order.id}`, 14, rgb(0.4, 0.4, 0.4));
    y -= 5;
    drawLine(y);

    // Quotation, Voucher, Discount, Final
    const sections = [
      { label: "Original Quotation", value: `$${order.quotation}`, bg: rgb(0.85, 0.9, 1), color: rgb(0, 0, 0.5) },
      { label: "Voucher Applied", value: order.voucherCode, bg: rgb(0.9, 1, 0.9), color: rgb(0, 0.5, 0) },
      { label: "Discount Percent", value: `${voucher.discount}%`, bg: rgb(1, 0.95, 0.9), color: rgb(0.6, 0.3, 0) },
      { label: "Final Amount", value: `$${order.discount}`, bg: rgb(0.9, 1, 1), color: rgb(0, 0.4, 0), bold: true },
    ];

    let boxY = y - 50;
    const boxHeight = 50;

    sections.forEach((sec) => {
      drawBox(40, boxY, 520, boxHeight, sec.bg);
      page.drawText(`${sec.label}: ${sec.value}`, { x: 50, y: boxY - 32, size: sec.bold ? 16 : 14, font: sec.bold ? fontBold : fontRegular, color: sec.color });
      boxY -= boxHeight + 10;
    });

    y = boxY - 30;
    drawLine(y);
    y -= 20;

    // Footer
    drawText("Thank you for using TaskUber!", 14, rgb(0.5, 0.5, 0.5), false);

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=invoice_${orderId}.pdf`,
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json({ error: "Error generating PDF" }, { status: 500 });
  }
};
