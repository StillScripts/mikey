import { migrate } from 'drizzle-orm/mysql2/migrator'
import { db, connection } from './scripts-connection.mts'

await migrate(db, { migrationsFolder: 'migrations' })

await connection.end().then(() => {
  console.log('Migration finished and db connection closed')
})
