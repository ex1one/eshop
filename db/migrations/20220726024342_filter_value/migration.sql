-- CreateTable
CREATE TABLE "FilterValue" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filterName" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "extra_quantity" DECIMAL(65,30),

    CONSTRAINT "FilterValue_pkey" PRIMARY KEY ("id")
);
