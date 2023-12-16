import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema.ts',
  out: './migrations',
  driver: 'mysql2',
  dbCredentials: {
    database: 'mikey_db',
    host: 'localhost',
    user: 'root',
    password: 'password'
  }
} satisfies Config
