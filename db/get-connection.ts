import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

export const getConnection = async () => {
	return await mysql.createConnection({
		database: 'mikey_db',
		host: 'localhost',
		user: 'root',
		password: 'password',
		multipleStatements: true
	})
}

export const getDb = async () => {
	const connection = await getConnection()
	return drizzle(connection)
}
