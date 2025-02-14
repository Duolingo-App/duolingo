/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_languageId_fkey`;

-- DropIndex
DROP INDEX `User_languageId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NULL,
    MODIFY `languageId` INTEGER NULL,
    ALTER COLUMN `clerkId` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `User_clerkId_key` ON `User`(`clerkId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `UserLanguage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
