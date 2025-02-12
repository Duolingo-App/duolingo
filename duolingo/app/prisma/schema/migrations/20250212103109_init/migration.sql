-- AlterTable
ALTER TABLE `heart` ADD COLUMN `isPayment` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `count` INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE `questionresponse` ADD COLUMN `testId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `chapterId` INTEGER NOT NULL,

    UNIQUE INDEX `Test_chapterId_key`(`chapterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuestionResponse` ADD CONSTRAINT `QuestionResponse_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
