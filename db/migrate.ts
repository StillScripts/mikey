import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'

import 'dotenv/config'

import { getConnection } from './get-connection'

const handleMigration = async () => {
	const connection = await getConnection()
	const db = drizzle(connection)

	await migrate(db, { migrationsFolder: 'migrations' })
	await connection.end().then(() => {
		console.log('Migration finished and db connection closed')
	})
}

handleMigration()
