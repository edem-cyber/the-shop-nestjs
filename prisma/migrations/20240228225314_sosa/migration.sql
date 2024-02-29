/*
  Warnings:

  - The values [COOKING,COOKED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'PACKAGING', 'ONTHEWAY_TO_PICKUP', 'ONTHEWAY_TO_DESTINATION', 'PACKAGED', 'PICKEDUP', 'DELIVERED', 'CANCELLED');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ClothingItem" DROP CONSTRAINT "ClothingItem_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Favourite" DROP CONSTRAINT "Favourite_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ShopRating" DROP CONSTRAINT "ShopRating_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ShopReview" DROP CONSTRAINT "ShopReview_shopId_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToShopCategory" DROP CONSTRAINT "_ShopToShopCategory_A_fkey";

-- AlterTable
ALTER TABLE "ClothingItem" ALTER COLUMN "shopId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Favourite" ALTER COLUMN "shopId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shopId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shop_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Shop_id_seq";

-- AlterTable
ALTER TABLE "ShopRating" ALTER COLUMN "shopId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ShopReview" ALTER COLUMN "shopId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ShopToShopCategory" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- AddForeignKey
ALTER TABLE "ClothingItem" ADD CONSTRAINT "ClothingItem_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopReview" ADD CONSTRAINT "ShopReview_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopRating" ADD CONSTRAINT "ShopRating_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopToShopCategory" ADD CONSTRAINT "_ShopToShopCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
