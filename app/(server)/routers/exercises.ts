'use server'

import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

import type { ExerciseFormKey } from '@/app/(dashboard)/_components/forms/exercise-form'
import { getDb } from '@/db/get-connection'
import { exercises } from '@/db/schema'
import { type ActionStatus, extractFormData, getStatus } from '@/lib/utils'

const exerciseFormKeys: ExerciseFormKey[] = ['title', 'description', 'userId']

export const getUserExercises = async (userId: string) => {
	const db = await getDb()
	return await db.query.exercises.findMany({
		where: eq(exercises.userId, userId)
	})
}

export const getExercise = async (id: string) => {
	const db = await getDb()
	return await db.query.exercises.findFirst({
		where: eq(exercises.id, id)
	})
}

export type Exercise = Awaited<ReturnType<typeof getExercise>>

export const createExercise = async (
	state: ActionStatus,
	formData: FormData
) => {
	const db = await getDb()
	const id = uuidv4()
	const { title, description, userId } = extractFormData<ExerciseFormKey>(
		formData,
		exerciseFormKeys
	)
	const res = await db.insert(exercises).values({
		id,
		title,
		description,
		userId
	})
	console.log(res)
	return getStatus('success', id)
}

export const updateExercise = async (
	state: ActionStatus,
	formData: FormData
) => {
	const db = await getDb()
	const id = formData.get('id') as string
	const { title, description, userId } = extractFormData(
		formData,
		exerciseFormKeys
	)
	await db
		.update(exercises)
		.set({
			id,
			title,
			description,
			userId
		})
		.where(eq(exercises.id, id))
	return getStatus('success')
}

export const deleteExercise = async (id: string) => {
	const db = await getDb()
	await db.delete(exercises).where(eq(exercises.id, id))
	revalidatePath('/admin/exercises')
}
