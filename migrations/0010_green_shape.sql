ALTER TABLE `exercise_sessions` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `exercise_sets` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `exercise_sets` MODIFY COLUMN `exercise_session_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `exercise_sets` MODIFY COLUMN `exercise_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `exercises` MODIFY COLUMN `id` varchar(255) NOT NULL;