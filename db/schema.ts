import { sql } from 'drizzle-orm'
import {
  mysqlTable,
  serial,
  text,
  varchar,
  json,
  boolean,
  timestamp
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
