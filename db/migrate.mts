import { migrate } from 'drizzle-orm/mysql2/migrator'
import { db, connection2 } from './connection.mts'

await migrate(db, { migrationsFolder: 'drizzle' })

await connection2.end().then(() => {
  console.log('Migration finished and db connection closed')
})
