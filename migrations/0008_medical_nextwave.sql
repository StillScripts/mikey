ALTER TABLE `blocks` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `blocks` ADD `serial_id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `serial_id` serial AUTO_INCREMENT NOT NULL;
