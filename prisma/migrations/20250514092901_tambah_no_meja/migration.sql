/*
  Warnings:

  - Added the required column `no_meja` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "no_meja" INTEGER NOT NULL;
