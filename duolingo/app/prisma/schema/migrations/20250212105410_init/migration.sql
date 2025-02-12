/*
  Warnings:

  - You are about to drop the column `code` on the `language` table. All the data in the column will be lost.
  - You are about to drop the column `chapterId` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `langue_base` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `langue_learn` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `niveaux` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `heart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questionresponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `languageId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chapter` DROP FOREIGN KEY `Chapter_userId_fkey`;

-- DropForeignKey
ALTER TABLE `heart` DROP FOREIGN KEY `Heart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_chapterId_fkey`;

-- DropForeignKey
ALTER TABLE `level` DROP FOREIGN KEY `Level_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `questionresponse` DROP FOREIGN KEY `QuestionResponse_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `questionresponse` DROP FOREIGN KEY `QuestionResponse_testId_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_userId_fkey`;

-- DropForeignKey
ALTER TABLE `test` DROP FOREIGN KEY `Test_chapterId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_langue_base_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_langue_learn_fkey`;

-- DropIndex
DROP INDEX `Language_code_key` ON `language`;

-- DropIndex
DROP INDEX `Lesson_chapterId_fkey` ON `lesson`;

-- DropIndex
DROP INDEX `User_langue_base_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_langue_learn_fkey` ON `user`;

-- AlterTable
ALTER TABLE `language` DROP COLUMN `code`,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `lesson` DROP COLUMN `chapterId`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `languageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `langue_base`,
    DROP COLUMN `langue_learn`,
    DROP COLUMN `name`,
    DROP COLUMN `niveaux`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `chapter`;

-- DropTable
DROP TABLE `heart`;

-- DropTable
DROP TABLE `level`;

-- DropTable
DROP TABLE `questionresponse`;

-- DropTable
DROP TABLE `score`;

-- DropTable
DROP TABLE `test`;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lessonId` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `options` VARCHAR(191) NOT NULL,
    `correctAnswer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `lessonId` INTEGER NOT NULL,
    `completedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAttempt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,
    `attemptedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `earnedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Achievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `pointsRequired` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Achievement_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAchievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `achievementId` INTEGER NOT NULL,
    `unlockedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Language_name_key` ON `Language`(`name`);

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAttempt` ADD CONSTRAINT `UserAttempt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAttempt` ADD CONSTRAINT `UserAttempt_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPoint` ADD CONSTRAINT `UserPoint_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAchievement` ADD CONSTRAINT `UserAchievement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAchievement` ADD CONSTRAINT `UserAchievement_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
