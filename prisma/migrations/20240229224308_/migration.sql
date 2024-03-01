/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ClothingItemLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ClothingItemOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ClothingItemRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ClothingItemReview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Favourite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RiderProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RiderRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RiderReview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShopCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShopRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShopReview` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_clothingItemOptionId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_riderProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_riderProfileId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "RiderRating" DROP CONSTRAINT "RiderRating_riderProfileId_fkey";

-- DropForeignKey
ALTER TABLE "RiderReview" DROP CONSTRAINT "RiderReview_riderProfileId_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToShopCategory" DROP CONSTRAINT "_ShopToShopCategory_B_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Address_id_seq";

-- AlterTable
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CartItem_id_seq";

-- AlterTable
ALTER TABLE "Choice" ALTER COLUMN "clothingItemOptionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ClothingItemLike" DROP CONSTRAINT "ClothingItemLike_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClothingItemLike_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClothingItemLike_id_seq";

-- AlterTable
ALTER TABLE "ClothingItemOption" DROP CONSTRAINT "ClothingItemOption_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClothingItemOption_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClothingItemOption_id_seq";

-- AlterTable
ALTER TABLE "ClothingItemRating" DROP CONSTRAINT "ClothingItemRating_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClothingItemRating_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClothingItemRating_id_seq";

-- AlterTable
ALTER TABLE "ClothingItemReview" DROP CONSTRAINT "ClothingItemReview_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClothingItemReview_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClothingItemReview_id_seq";

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Comment_id_seq";

-- AlterTable
ALTER TABLE "Favourite" DROP CONSTRAINT "Favourite_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Favourite_id_seq";

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "riderProfileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Message_id_seq";

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Notification_id_seq";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "riderProfileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";

-- AlterTable
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OrderItem_id_seq";

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Payment_id_seq";

-- AlterTable
ALTER TABLE "RiderProfile" DROP CONSTRAINT "RiderProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RiderProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RiderProfile_id_seq";

-- AlterTable
ALTER TABLE "RiderRating" DROP CONSTRAINT "RiderRating_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "riderProfileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RiderRating_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RiderRating_id_seq";

-- AlterTable
ALTER TABLE "RiderReview" DROP CONSTRAINT "RiderReview_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "riderProfileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RiderReview_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RiderReview_id_seq";

-- AlterTable
ALTER TABLE "ShopCategory" DROP CONSTRAINT "ShopCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShopCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShopCategory_id_seq";

-- AlterTable
ALTER TABLE "ShopRating" DROP CONSTRAINT "ShopRating_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShopRating_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShopRating_id_seq";

-- AlterTable
ALTER TABLE "ShopReview" DROP CONSTRAINT "ShopReview_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShopReview_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShopReview_id_seq";

-- AlterTable
ALTER TABLE "_ShopToShopCategory" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_riderProfileId_fkey" FOREIGN KEY ("riderProfileId") REFERENCES "RiderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_riderProfileId_fkey" FOREIGN KEY ("riderProfileId") REFERENCES "RiderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_clothingItemOptionId_fkey" FOREIGN KEY ("clothingItemOptionId") REFERENCES "ClothingItemOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiderReview" ADD CONSTRAINT "RiderReview_riderProfileId_fkey" FOREIGN KEY ("riderProfileId") REFERENCES "RiderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiderRating" ADD CONSTRAINT "RiderRating_riderProfileId_fkey" FOREIGN KEY ("riderProfileId") REFERENCES "RiderProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopToShopCategory" ADD CONSTRAINT "_ShopToShopCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ShopCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
