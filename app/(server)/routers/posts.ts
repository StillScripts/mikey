import { db } from '@/db/connection.mts'
import { posts } from '@/db/schema.mts'

export const getAllPosts = async () => {
  return await db.select().from(posts)
}
