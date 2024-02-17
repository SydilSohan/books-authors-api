-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "browser_ip" TEXT,
ADD COLUMN     "buyer_accepts_marketing" BOOLEAN,
ADD COLUMN     "cancelled_at" TEXT,
ADD COLUMN     "cancelled_reason" TEXT,
ADD COLUMN     "company" JSONB;
