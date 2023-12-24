'use server'

import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'

import { getDb } from '@/db/get-connection'
import { blocks, posts } from '@/db/schema'
import { type ActionStatus, getStatus } from '@/lib/utils'

export const getAllPosts = async () => {
	const db = await getDb()
	return await db.select().from(posts)
}

export const getBlock = async (id: number) => {
	const db = await getDb()
	return await db.select().from(blocks).where(eq(blocks.id, id))
}

export type SingleBlock = Awaited<ReturnType<typeof getBlock>>[number]

export const getPostBySlug = async (slug: string) => {
	const db = await getDb()
	return await db.select().from(posts).where(eq(posts.slug, slug))
}

export const createBlock = async (state: ActionStatus, formData: FormData) => {
	const db = await getDb()
	const content = formData.get('content') as string

	if (content && blocks) {
		await db.insert(blocks).values({
			type: 'cards',
			content
		})
		revalidatePath('/admin/posts')
		return getStatus('success')
	}
	return getStatus('error')
}
