import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

import * as schema from './schema'

const connection = await mysql.createConnection({
	database: 'mikey_db',
	host: 'localhost',
	user: 'root',
	password: 'password',
	multipleStatements: true
})

export const db = drizzle(connection, { schema, mode: 'default' })
