'use server'

import { db } from '@/db/connection.mts'
import { posts } from '@/db/schema.mts'

export const getAllPosts = async () => {
  return await db.select().from(posts)
}

export const createPost = async (state: any, formData: FormData) => {
  const id = state.id
  const title = formData.get('title') as string
  const blocks = formData.get('blocks') as string

  if (id && title && blocks) {
    const slug = title.trim().toLowerCase().replace(/ /g, '-')
    console.log(`INSERT INTO Post (id, title, slug, meta_title, draft_content)
    VALUES ('${id}', '${title}', '${slug}', '${title}', '${blocks}');
    ;`)
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
