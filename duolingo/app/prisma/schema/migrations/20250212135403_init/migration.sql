/*
  Warnings:

  - Added the required column `flag` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `language` ADD COLUMN `flag` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `languageId` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `UserLanguage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `flag` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserLanguage_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `UserLanguage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
