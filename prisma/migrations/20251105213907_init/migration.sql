-- CreateEnum
CREATE TYPE "taskuber_database"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "taskuber_database"."VoucherFor" AS ENUM ('REFERRER', 'REFEREE', 'MILESTONE3', 'MILESTONE5');

-- CreateTable
CREATE TABLE "taskuber_database"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "taskuber_database"."Role" NOT NULL DEFAULT 'USER',
    "referralCode" TEXT,
    "referredById" TEXT,
    "wallet" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskuber_database"."ServiceRequest" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "fileUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "quotation" TEXT,
    "voucherCode" TEXT,
    "discount" DOUBLE PRECISION,
    "invoiceSent" BOOLEAN NOT NULL DEFAULT false,
    "voucherId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskuber_database"."Voucher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'PERCENT',
    "appliesTo" "taskuber_database"."VoucherFor" NOT NULL DEFAULT 'REFEREE',
    "condition" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskuber_database"."Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskuber_database"."ReferralReward" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "refereeId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskuber_database"."AppSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "taskuber_database"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "taskuber_database"."User"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "taskuber_database"."Voucher"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AppSetting_key_key" ON "taskuber_database"."AppSetting"("key");

-- AddForeignKey
ALTER TABLE "taskuber_database"."User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "taskuber_database"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskuber_database"."ServiceRequest" ADD CONSTRAINT "ServiceRequest_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "taskuber_database"."Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskuber_database"."ServiceRequest" ADD CONSTRAINT "ServiceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "taskuber_database"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskuber_database"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "taskuber_database"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskuber_database"."ReferralReward" ADD CONSTRAINT "ReferralReward_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "taskuber_database"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskuber_database"."ReferralReward" ADD CONSTRAINT "ReferralReward_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "taskuber_database"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
