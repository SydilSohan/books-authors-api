/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE orders_order_id_seq;
ALTER TABLE "Orders" ALTER COLUMN "order_id" SET DEFAULT nextval('orders_order_id_seq');
ALTER SEQUENCE orders_order_id_seq OWNED BY "Orders"."order_id";

-- CreateIndex
CREATE UNIQUE INDEX "Orders_order_id_key" ON "Orders"("order_id");
