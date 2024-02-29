/*
  Warnings:

  - The primary key for the `ClothingItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_clothingItemId_fkey";

-- DropForeignKey
ALTER TABLE "ClothingItemLike" DROP CONSTRAINT "ClothingItemLike_clothingItemId_fkey";

-- DropForeignKey
ALTER TABLE "ClothingItemOption" DROP CONSTRAINT "ClothingItemOption_clothingItemId_fkey";

-- DropForeignKey
ALTER TABLE "ClothingItemRating" DROP CONSTRAINT "ClothingItemRating_clothingItemId_fkey";

-- DropForeignKey
ALTER TABLE "ClothingItemReview" DROP CONSTRAINT "ClothingItemReview_clothingItemId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_clothingItemId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_clothingItemId_fkey";

-- DropForeignKey
ALTER TABLE "_ClothingCategoryToClothingItem" DROP CONSTRAINT "_ClothingCategoryToClothingItem_B_fkey";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "clothingItemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ClothingItem" DROP CONSTRAINT "ClothingItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClothingItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClothingItem_id_seq";

-- AlterTable
ALTER TABLE "ClothingItemLike" ALTER COLUMN "clothingItemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ClothingItemOption" ALTER COLUMN "clothingItemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ClothingItemRating" ALTER COLUMN "clothingItemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ClothingItemReview" ALTER COLUMN "clothingItemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "clothingItemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "clothingItemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClothingCategoryToClothingItem" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemLike" ADD CONSTRAINT "ClothingItemLike_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemOption" ADD CONSTRAINT "ClothingItemOption_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemReview" ADD CONSTRAINT "ClothingItemReview_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingItemRating" ADD CONSTRAINT "ClothingItemRating_clothingItemId_fkey" FOREIGN KEY ("clothingItemId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClothingCategoryToClothingItem" ADD CONSTRAINT "_ClothingCategoryToClothingItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ClothingItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
