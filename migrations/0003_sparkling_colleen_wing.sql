CREATE TABLE `exercise_sessions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`date` timestamp NOT NULL,
	`notes` text,
	CONSTRAINT `exercise_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exercise_sets` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`reps` int,
	`exercise_session_id` bigint unsigned,
	`exercise_id` bigint unsigned,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `exercise_sets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `exercises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `exercise_sets` ADD CONSTRAINT `exercise_sets_exercise_session_id_exercise_sessions_id_fk` FOREIGN KEY (`exercise_session_id`) REFERENCES `exercise_sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `exercise_sets` ADD CONSTRAINT `exercise_sets_exercise_id_exercises_id_fk` FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON DELETE no action ON UPDATE no action;