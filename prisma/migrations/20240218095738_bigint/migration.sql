-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "order_id" SET DEFAULT 123424,
ALTER COLUMN "order_id" DROP DEFAULT;
DROP SEQUENCE "Orders_order_id_seq";
