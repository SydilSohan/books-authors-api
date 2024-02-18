/*
  Warnings:

  - You are about to alter the column `order_id` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "order_id" SET DATA TYPE INTEGER;
