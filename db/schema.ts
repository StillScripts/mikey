import { relations, sql } from 'drizzle-orm'
import {
	bigint,
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

const createdAndUpdated = {
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
}

export const posts = mysqlTable('posts', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull(),
	content: json('content'),
	draftContent: json('draft_content'),
	metaTitle: varchar('meta_title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	published: boolean('published').default(false),
	...createdAndUpdated
})

export const blocks = mysqlTable('blocks', {
	id: serial('id').primaryKey(),
	type: mysqlEnum('type', ['cards']),
	title: varchar('title', { length: 255 }).notNull(),
	content: json('content')
})

/** Table for storing an exercise session */
export const exerciseSessions = mysqlTable('exercise_sessions', {
	id: serial('id').primaryKey(),
	date: timestamp('date').notNull(),
	notes: text('notes')
})

/** Table for storing each set in an exercise session */
export const exerciseSets = mysqlTable('exercise_sets', {
	id: serial('id').primaryKey(),
	reps: int('reps'),
	exerciseSessionId: bigint('exercise_session_id', {
		mode:'bigint',
		unsigned: true
	}).references(() => exerciseSessions.id),
	exerciseId: bigint('exercise_id', {mode:'bigint',unsigned:true}).references(() => exercises.id),
	...createdAndUpdated
})

/** Table for storing a unique type of exercise */
export const exercises = mysqlTable('exercises', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	...createdAndUpdated
})

/** An exercise session can have many exercise sets */
export const exerciseSessionsRelations = relations(
	exerciseSessions,
	({ many }) => ({
		exerciseSets: many(exerciseSets)
	})
)

/** An exercise set will always be linked to one exercise */
export const exerciseSetsRelations = relations(exerciseSets, ({ one }) => ({
	exerciseSessions: one(exerciseSessions, {
		fields: [exerciseSets.exerciseSessionId],
		references: [exerciseSessions.id]
	}),
	exercises: one(exercises, {
		fields: [exerciseSets.exerciseId],
		references: [exercises.id]
	})
}))

/** An exercise can be included in many exercise sets */
export const exercisesRelations = relations(exercises, ({ many }) => ({
	exerciseSets: many(exerciseSets)
}))
