import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

export const connection = await mysql.createConnection({
  database: 'mikey_db',
  host: 'localhost',
  user: 'root',
  password: 'password',
  multipleStatements: true
})

export const db = drizzle(connection)
