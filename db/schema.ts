import { type AdapterAccount } from 'next-auth/adapters'

import { relations, sql } from 'drizzle-orm'
import {
	boolean,
	index,
	int,
	json,
	mysqlEnum,
	mysqlTableCreator,
	primaryKey,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/mysql-core'
import { v4 as uuidv4 } from 'uuid'

const createdAndUpdated = {
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
}

export const mysqlTable = mysqlTableCreator(
	name => name
	//name => `${process.env.DATABASE_TABLE_PREFIX}_${name}`
)

export const posts = mysqlTable('posts', {
	id: varchar('id', { length: 255 }).notNull().primaryKey(),
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
	id: varchar('id', { length: 255 }).notNull().primaryKey(),
	type: mysqlEnum('type', ['cards']),
	title: varchar('title', { length: 255 }).notNull(),
	content: json('content')
})

/** Table for storing an exercise session */
export const exerciseSessions = mysqlTable('exercise_sessions', {
	id: varchar('id', { length: 255 }).notNull().primaryKey(),
	date: timestamp('date').notNull(),
	notes: text('notes'),
	userId: varchar('userId', { length: 255 })
		.notNull()
		.references(() => users.id)
})

/** Table for storing each set in an exercise session */
export const exerciseSets = mysqlTable('exercise_sets', {
	id: varchar('id', { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuidv4()),
	reps: int('reps'),
	sets: int('sets').default(1),
	exerciseSessionId: varchar('exercise_session_id', { length: 255 })
		.notNull()
		.references(() => exerciseSessions.id),
	exerciseId: varchar('exercise_id', { length: 255 })
		.notNull()
		.references(() => exercises.id),
	exerciseTitle: varchar('exercise_title', { length: 255 }),
	...createdAndUpdated
})

/** Table for storing a unique type of exercise */
export const exercises = mysqlTable('exercises', {
	id: varchar('id', { length: 255 }).notNull().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	userId: varchar('userId', { length: 255 })
		.notNull()
		.references(() => users.id),
	...createdAndUpdated
})

/** An exercise session can have many exercise sets */
export const exerciseSessionsRelations = relations(
	exerciseSessions,
	({ many, one }) => ({
		exerciseSets: many(exerciseSets),
		user: one(users, {
			fields: [exerciseSessions.userId],
			references: [users.id]
		})
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
export const exercisesRelations = relations(exercises, ({ many, one }) => ({
	exerciseSets: many(exerciseSets),
	user: one(users, {
		fields: [exercises.userId],
		references: [users.id]
	})
}))

// USER MANAGEMENT
export const users = mysqlTable('user', {
	id: varchar('id', { length: 255 }).notNull().primaryKey(),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull(),
	emailVerified: timestamp('emailVerified', {
		mode: 'date',
		fsp: 3
	}).default(sql`CURRENT_TIMESTAMP(3)`),
	image: varchar('image', { length: 255 })
})

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	exerciseSessions: many(exerciseSessions),
	exercises: many(exercises)
}))

export const accounts = mysqlTable(
	'account',
	{
		userId: varchar('userId', { length: 255 }).notNull(),
		type: varchar('type', { length: 255 })
			.$type<AdapterAccount['type']>()
			.notNull(),
		provider: varchar('provider', { length: 255 }).notNull(),
		providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: int('expires_at'),
		token_type: varchar('token_type', { length: 255 }),
		scope: varchar('scope', { length: 255 }),
		id_token: text('id_token'),
		session_state: varchar('session_state', { length: 255 })
	},
	account => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		}),
		userIdIdx: index('userId_idx').on(account.userId)
	})
)

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const sessions = mysqlTable(
	'session',
	{
		sessionToken: varchar('sessionToken', { length: 255 })
			.notNull()
			.primaryKey(),
		userId: varchar('userId', { length: 255 }).notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	session => ({
		userIdIdx: index('userId_idx').on(session.userId)
	})
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export const verificationTokens = mysqlTable(
	'verificationToken',
	{
		identifier: varchar('identifier', { length: 255 }).notNull(),
		token: varchar('token', { length: 255 }).notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	vt => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
	})
)
