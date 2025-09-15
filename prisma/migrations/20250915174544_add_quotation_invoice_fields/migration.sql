-- AlterTable
ALTER TABLE "public"."ServiceRequest" ADD COLUMN     "finalAmount" DOUBLE PRECISION,
ADD COLUMN     "invoiceSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quotation" TEXT,
ADD COLUMN     "voucher" TEXT;
