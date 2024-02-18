-- DropIndex
DROP INDEX "Orders_order_id_key";

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "order_id" DROP NOT NULL,
ALTER COLUMN "order_id" DROP DEFAULT,
ALTER COLUMN "order_id" SET DATA TYPE BIGINT;
