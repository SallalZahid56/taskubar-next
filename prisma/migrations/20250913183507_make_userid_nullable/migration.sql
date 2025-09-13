-- DropForeignKey
ALTER TABLE "public"."ServiceRequest" DROP CONSTRAINT "ServiceRequest_userId_fkey";

-- AlterTable
ALTER TABLE "public"."ServiceRequest" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ServiceRequest" ADD CONSTRAINT "ServiceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
