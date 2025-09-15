export async function POST(req, { params }) {
  const { code } = await req.json();
  const updated = await prisma.serviceRequest.update({
    where: { id: params.id },
    data: { voucher: code }
  });
  return NextResponse.json(updated);
}
