/*
  Warnings:

  - The `googleProvider` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleProvider",
ADD COLUMN     "googleProvider" TIMESTAMP(3);
