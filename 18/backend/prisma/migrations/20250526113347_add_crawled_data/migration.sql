-- CreateTable
CREATE TABLE "CrawledData" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "crawledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "CrawledData_pkey" PRIMARY KEY ("id")
);
