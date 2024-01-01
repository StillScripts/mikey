ALTER TABLE `exercise_sessions` ADD `userId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `exercises` ADD `userId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `exercise_sessions` ADD CONSTRAINT `exercise_sessions_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;