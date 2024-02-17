-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "billing_address" JSONB,
    "client_details" JSONB,
    "confirmation_number" TEXT,
    "current_total_additional_fees_set" JSONB,
    "current_total_price" TEXT,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");
