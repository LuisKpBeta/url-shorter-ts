-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "urlToken" VARCHAR(20) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
