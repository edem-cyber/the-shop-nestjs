/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Choice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ClothingCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[cartId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_clothingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "_ClothingCategoryToClothingItem" DROP CONSTRAINT "_ClothingCategoryToClothingItem_A_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cart_id_seq";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "cartId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Choice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Choice_id_seq";

-- AlterTable
ALTER TABLE "ClothingCategory" DROP CONSTRAINT "ClothingCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClothingCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClothingCategory_id_seq";

-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "clothingCategoryId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClothingCategoryToClothingItem" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_key" ON "CartItem"("cartId");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_clothingCategoryId_fkey" FOREIGN KEY ("clothingCategoryId") REFERENCES "ClothingCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClothingCategoryToClothingItem" ADD CONSTRAINT "_ClothingCategoryToClothingItem_A_fkey" FOREIGN KEY ("A") REFERENCES "ClothingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
