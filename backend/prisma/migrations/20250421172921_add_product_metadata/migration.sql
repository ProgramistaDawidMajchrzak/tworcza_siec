/*
  Warnings:

  - A unique constraint covering the columns `[productCode]` on the table `digital_products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "digital_products" ADD COLUMN     "productCode" TEXT NOT NULL DEFAULT 'TEMP_CODE',
ADD COLUMN     "special" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Strona Internetowa',
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "digital_products_productCode_key" ON "digital_products"("productCode");
