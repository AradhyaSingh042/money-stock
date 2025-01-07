/*
  Warnings:

  - Added the required column `updatedAt` to the `TopLosers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TopGainers" ALTER COLUMN "percentGain" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TopLosers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "percentGain" DROP NOT NULL;
