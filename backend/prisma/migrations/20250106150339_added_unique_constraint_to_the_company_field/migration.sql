/*
  Warnings:

  - A unique constraint covering the columns `[company]` on the table `TopGainers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company]` on the table `TopLosers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TopGainers_company_key" ON "TopGainers"("company");

-- CreateIndex
CREATE UNIQUE INDEX "TopLosers_company_key" ON "TopLosers"("company");
