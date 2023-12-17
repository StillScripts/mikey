import { sql } from 'drizzle-orm'
import {
	boolean,
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
	mysqlEnum: mysqlEnum('type', ['cards']),
	content: json('content')
})
