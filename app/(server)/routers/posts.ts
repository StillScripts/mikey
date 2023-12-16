'use server'

import { getDb } from '@/db/get-connection'
import { posts } from '@/db/schema'
import { type ActionStatus, getStatus } from '@/lib/utils'

export const getAllPosts = async () => {
  const db = await getDb()
  return await db.select().from(posts)
}

export const createPost = async (state: ActionStatus, formData: FormData) => {
  const db = await getDb()
  const title = formData.get('title') as string
  const blocks = formData.get('blocks') as string

  if (title && blocks) {
    const slug = title.trim().toLowerCase().replace(/ /g, '-')
    await db.insert(posts).values({
      title,
      slug,
      metaTitle: title,
      description: '',
      draftContent: blocks
    })
    return getStatus('success')
  }
  return getStatus('error')
}
