/*
  Warnings:

  - You are about to drop the column `location` on the `Restaurants` table. All the data in the column will be lost.
  - Added the required column `lat` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `log` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItens" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Restaurants" DROP COLUMN "location",
ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "log" TEXT NOT NULL;
