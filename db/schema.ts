import { sql } from 'drizzle-orm'
import {
	boolean,
	int,
	json,
	mysqlEnum,
	mysqlTable,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/mysql-core'

export const posts = mysqlTable('posts', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull(),
	content: json('content'),
	draftContent: json('draft_content'),
	metaTitle: varchar('meta_title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	published: boolean('published').default(false),
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
})

export const blocks = mysqlTable('blocks', {
	id: serial('id').primaryKey(),
	type: mysqlEnum('type', ['cards']),
	title: varchar('title', { length: 255 }).notNull(),
	content: json('content')
})

export const exerciseSession = mysqlTable('exercise_session', {
	id: serial('id').primaryKey(),
	date: timestamp('date').notNull(),
	notes: text('notes')
})

// TODO, add relationship where 1 session has many sets

export const exerciseSet = mysqlTable('exercise_set', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	reps: int('reps'),
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
})
