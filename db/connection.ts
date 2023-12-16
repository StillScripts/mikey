import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import mysql2 from 'mysql2'

export const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password'
})

export const connection2 = await mysql.createConnection({
  database: 'mikey_db',
  host: 'localhost',
  user: 'root',
  password: 'password'
})

export const db = drizzle(connection2)
