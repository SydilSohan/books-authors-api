/*
  Warnings:

  - Made the column `order_id` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "order_id" SET NOT NULL,
ALTER COLUMN "order_id" SET DEFAULT 12345;
