'use server'

import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid'

import { getDb } from '@/db/get-connection'
import { posts } from '@/db/schema'
import { type ActionStatus, getStatus } from '@/lib/utils'

export const getAllPosts = async () => {
	const db = await getDb()
	return await db.select().from(posts)
}

export const getPost = async (id: string) => {
	const db = await getDb()
	return await db.query.posts.findFirst({
		where: eq(posts.id, id)
	})
}

export type SinglePost = Awaited<ReturnType<typeof getPost>>

export const getPostBySlug = async (slug: string) => {
	const db = await getDb()
	return await db.query.posts.findFirst({
		where: eq(posts.slug, slug)
	})
}

export const createPost = async (state: ActionStatus, formData: FormData) => {
	const db = await getDb()
	const title = formData.get('title') as string
	const blocks = formData.get('blocks') as string
	if (title && blocks) {
		const slug = slugify(title, { strict: true, lower: true })
		await db.insert(posts).values({
			id: uuidv4(),
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

export const deletePost = async (id: string) => {
	const db = await getDb()
	await db.delete(posts).where(eq(posts.id, id))
	revalidatePath('/admin/posts')
}
