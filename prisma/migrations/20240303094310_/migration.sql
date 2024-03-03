/*
  Warnings:

  - A unique constraint covering the columns `[orderItemId]` on the table `ClothingItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clothingItemId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderItemId` to the `ClothingItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClothingItem" ADD COLUMN     "orderItemId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ClothingItem_orderItemId_key" ON "ClothingItem"("orderItemId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_clothingItemId_key" ON "OrderItem"("clothingItemId");
