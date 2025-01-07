-- CreateTable
CREATE TABLE "TopGainers" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "lastPrice" DOUBLE PRECISION NOT NULL,
    "prevClose" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "percentGain" DOUBLE PRECISION NOT NULL,
    "percentLoss" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopGainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopLosers" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "lastPrice" DOUBLE PRECISION NOT NULL,
    "prevClose" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "percentGain" DOUBLE PRECISION NOT NULL,
    "percentLoss" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TopLosers_pkey" PRIMARY KEY ("id")
);
