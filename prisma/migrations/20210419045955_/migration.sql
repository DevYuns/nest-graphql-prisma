/*
  Warnings:

  - You are about to drop the column `Description` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
