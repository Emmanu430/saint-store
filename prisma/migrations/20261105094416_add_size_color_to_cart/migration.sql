/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId,size,color]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CartItem_userId_productId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "size" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sizes" TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL']::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_productId_size_color_key" ON "CartItem"("userId", "productId", "size", "color");
