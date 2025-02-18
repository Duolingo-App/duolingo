-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `filepath` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
