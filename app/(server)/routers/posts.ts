'use server'

import { db } from '@/db/connection'
import { posts } from '@/db/schema'

export const getAllPosts = async () => {
  return await db.select().from(posts)
}

export const createPost = async (state: any, formData: FormData) => {
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
    return { error: false, success: true }
  }
  return { error: true, success: false }
}
