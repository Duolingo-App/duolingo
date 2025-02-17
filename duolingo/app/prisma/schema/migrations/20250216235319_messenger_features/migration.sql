-- AlterTable
ALTER TABLE `message` ADD COLUMN `reactions` JSON NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'sent',
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'text';
