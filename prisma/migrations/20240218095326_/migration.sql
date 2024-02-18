-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "order_id" BIGSERIAL NOT NULL,
    "billing_address" JSONB,
    "client_details" JSONB,
    "confirmation_number" TEXT,
    "current_total_additional_fees_set" JSONB,
    "current_total_price" TEXT,
    "cancelled_at" TEXT,
    "cancelled_reason" TEXT,
    "browser_ip" TEXT,
    "buyer_accepts_marketing" BOOLEAN,
    "company" JSONB,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_order_id_key" ON "Orders"("order_id");
