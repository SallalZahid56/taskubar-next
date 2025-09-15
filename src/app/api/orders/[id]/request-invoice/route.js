export async function POST(req, { params }) {
  const updated = await prisma.serviceRequest.update({
    where: { id: params.id },
    data: { status: "Invoice Requested" }
  });
  return NextResponse.json(updated);
}
