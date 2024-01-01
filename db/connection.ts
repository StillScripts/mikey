import { drizzle } from 'drizzle-orm/mysql2'

import { getConnection } from './get-connection'

export const db = drizzle(await getConnection())
