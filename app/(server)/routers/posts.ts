'use server'

import { getDb } from '@/db/get-connection'
import { posts } from '@/db/schema'
import { type ActionStatus, getStatus } from '@/lib/utils'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const getAllPosts = async () => {
  const db = await getDb()
  return await db.select().from(posts)
}

export const getPost = async (id: number) => {
  const db = await getDb()
  return await db.select().from(posts).where(eq(posts.id, id))
}

export type SinglePost = Awaited<ReturnType<typeof getPost>>[number]

export const getPostBySlug = async (slug: string) => {
  const db = await getDb()
  return await db.select().from(posts).where(eq(posts.slug, slug))
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
    revalidatePath('/admin/posts')
    return getStatus('success')
  }
  return getStatus('error')
}

export const updatePost = async (
  state: ActionStatus & Partial<SinglePost>,
  formData: FormData
) => {
  const db = await getDb()
  const title = formData.get('title') as string
  const blocks = formData.get('blocks') as string

  if (title && blocks) {
    const slug = title.trim().toLowerCase().replace(/ /g, '-')
    await db
      .update(posts)
      .set({
        title,
        slug,
        metaTitle: title,
        description: '',
        draftContent: blocks
      })
      .where(eq(posts.id, state.id!))
    revalidatePath('/admin/posts')
    return getStatus('success')
  }
  return getStatus('error')
}

export const deletePost = async (id: number) => {
  const db = await getDb()
  await db.delete(posts).where(eq(posts.id, id))
  revalidatePath('/admin/posts')
}
