// GET /api/settings/reward-info
import prisma from "@/lib/prisma";

export async function GET() {
  const milestoneSetting = await prisma.appSetting.findUnique({ where: { key: "milestoneDiscount" } });
  const milestoneDiscount = milestoneSetting ? milestoneSetting.value : "10";

  return Response.json({
    message: `🎯 Complete 3 projects in the same category and get ${milestoneDiscount}% off your next one!`,
    discount: milestoneDiscount,
  });
}
