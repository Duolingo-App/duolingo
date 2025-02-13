/*
  Warnings:

  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `question` ADD COLUMN `type` ENUM('TRANSLATE', 'SELECT', 'ARRANGE', 'LISTEN', 'SPEAK') NOT NULL;
