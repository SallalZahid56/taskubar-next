import prisma from "@/lib/prisma";

export async function GET() {
  const vouchers = await prisma.voucher.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json({ vouchers });
}

export async function POST(req) {
  try {
    const { name, code, discount, type, appliesTo, condition, expiresAt } = await req.json();

    if (!name || !code || !discount || !appliesTo) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const voucher = await prisma.voucher.create({
      data: {
        name,
        code,
        discount: parseFloat(discount),
        type: type || "PERCENT",
        appliesTo,
        condition,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return Response.json({ voucher });
  } catch (error) {
    console.error("Error creating voucher:", error);
    return Response.json({ error: "Failed to create voucher" }, { status: 500 });
  }
}
