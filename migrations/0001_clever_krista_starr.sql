CREATE TABLE `blocks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`type` enum('cards'),
	`content` json,
	CONSTRAINT `blocks_id` PRIMARY KEY(`id`)
);
