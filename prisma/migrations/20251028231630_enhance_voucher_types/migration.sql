-- CreateEnum
CREATE TYPE "public"."VoucherFor" AS ENUM ('REFERRER', 'REFEREE', 'MILESTONE3', 'MILESTONE5');

-- AlterTable
ALTER TABLE "public"."Voucher" ADD COLUMN     "appliesTo" "public"."VoucherFor" NOT NULL DEFAULT 'REFEREE',
ADD COLUMN     "condition" TEXT;
