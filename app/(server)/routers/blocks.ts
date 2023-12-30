'use server'

import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'

import { getDb } from '@/db/get-connection'
import { blocks } from '@/db/schema'
import { type ActionStatus, getStatus } from '@/lib/utils'

export type StarterBlockType = (typeof blocks)['type']['enumValues'][number]

export const getBlocks = async () => {
	const db = await getDb()
	return await db.select().from(blocks)
}

export type SingleBlock = Awaited<ReturnType<typeof getBlocks>>[number]

export const getBlocksByType = async (type: StarterBlockType) => {
	const db = await getDb()
	return await db.select().from(blocks).where(eq(blocks.type, type))
}

export const createBlock = async (state: ActionStatus, formData: FormData) => {
	const db = await getDb()
	const title = formData.get('title') as string
	const content = formData.get('content') as string

	if (title && blocks) {
		await db.insert(blocks).values({
			type: 'cards',
			content,
			title
		})
		revalidatePath('/admin')
		return getStatus('success')
	}
	return getStatus('error')
}
