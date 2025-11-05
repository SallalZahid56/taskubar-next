/*
  Warnings:

  - You are about to drop the column `finalAmount` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `voucher` on the `ServiceRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ServiceRequest" DROP COLUMN "finalAmount",
DROP COLUMN "voucher",
ADD COLUMN     "voucherId" TEXT;

-- CreateTable
CREATE TABLE "public"."Voucher" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "public"."Voucher"("code");

-- AddForeignKey
ALTER TABLE "public"."ServiceRequest" ADD CONSTRAINT "ServiceRequest_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "public"."Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
