-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "fraudScore" DOUBLE PRECISION,
ADD COLUMN     "isDuplicate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFraudulent" BOOLEAN NOT NULL DEFAULT false;
