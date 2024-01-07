'use server'
/* eslint-disable no-console */
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

import { getDb } from '@/db/get-connection'
import { exerciseSessions, exerciseSets } from '@/db/schema'
import { type ActionStatus, getStatus } from '@/lib/utils'

export const getExerciseSessions = async (userId: string) => {
	const db = await getDb()
	return await db.query.exerciseSessions.findMany({
		where: eq(exerciseSessions.userId, userId),
		with: { exerciseSets: true }
	})
}

export const getExerciseSession = async (id: string) => {
	const db = await getDb()
	return await db.query.exerciseSessions.findFirst({
		where: eq(exerciseSessions.id, id),
		with: { exerciseSets: true }
	})
}

export type ExerciseSession = Awaited<ReturnType<typeof getExerciseSession>>

const getAllSets = (formData: FormData) => {
	const titles: string[] = []
	const reps: number[] = []
	const sets: number[] = []
	const ids: Record<number, string> = {}
	const allSets: {
		exerciseTitle: string
		reps: number
		sets: number
		id?: string
	}[] = []
	let index = 0
	for (const [key, value] of formData.entries()) {
		if (key.includes('.title')) {
			titles.push(value.toString())
		} else if (key.includes('.reps')) {
			reps.push(parseInt(value.toString()))
		} else if (key.includes('.sets')) {
			sets.push(parseInt(value.toString()))
		} else if (key.includes('.id')) {
			ids[index] = value.toString()
		}
		index++
	}
	titles.forEach((title, index) => {
		const id = ids[index]
		allSets.push({
			exerciseTitle: title,
			reps: reps[index]!,
			sets: sets[index]!,
			id: id
		})
	})
	return allSets
}

export const createExerciseSession = async (
	state: ActionStatus,
	formData: FormData
) => {
	const db = await getDb()
	const id = uuidv4()
	const notes = formData.get('notes') as string
	const date = formData.get('dateString') as string
	const userId = formData.get('userId') as string

	const allSets = getAllSets(formData)

	if (notes && userId) {
		console.log({
			id,
			notes,
			date: new Date(date),
			userId
		})
		await db
			.insert(exerciseSessions)
			.values({
				id,
				notes,
				date: new Date(date),
				userId
			})
			.catch(err => {
				console.log(err)
				return getStatus('error')
			})
			.finally(() => {
				console.log({
					notes,
					date: new Date(date),
					userId
				})
			})
		if (allSets.length > 0) {
			console.log(allSets)
			await db
				.insert(exerciseSets)
				.values(
					// @ts-expect-error this doesn't matter
					allSets.map(set => ({ ...set, exerciseSessionId: id }))
				)
				.catch(err => {
					console.log(err)
					return getStatus('error')
				})
				.finally(() => {
					console.log(allSets)
				})
		}
	}

	return getStatus('success', id)
}

export const updateExerciseSession = async (
	state: ActionStatus,
	formData: FormData
) => {
	const notes = formData.get('notes') as string
	// for some reason this isn't working
	const date = formData.get('dateString') as string
	console.log(date)
	const id = formData.get('id') as string
	console.log(id)
	const userId = formData.get('userId') as string
	const db = await getDb()
	const allSets = getAllSets(formData)

	if (notes && userId) {
		console.log({
			notes,
			date: new Date(date),
			userId
		})
		// await db
		// 	.update(exerciseSessions)
		// 	.set({
		// 		notes,
		// 		date: new Date(),
		// 		userId
		// 	})
		// 	.where(eq(exerciseSessions.id, id))
		if (allSets.length > 0) {
			const newSets = allSets.filter(set => !set?.id)
			//const existingSets = allSets.filter(set => set?.id)

			if (newSets.length > 0) {
				await db
					.insert(exerciseSets)
					.values(
						// @ts-expect-error This is hard to type...
						newSets.map(set => ({ ...set, exerciseSessionId: id }))
					)
					.catch(err => {
						console.log(err)
						return getStatus('error')
					})
					.finally(() => {
						console.log(allSets)
					})
			}
		}
	}

	return getStatus('success')
}

// update: protectedProcedure
//     .input(
//       z.object({
//         id: z.number(),
//         name: z.string().min(1),
//         description: z.string().optional(),
//         ingredients: z.array(
//           z.object({
//             name: z.string(),
//             quantity: z.string(),
//             recipeIngredientId: z.number().optional(),
//           }),
//         ),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       // Update the recipe
//       await ctx.db
//         .update(recipes)
//         .set({ name: input.name, description: input.description })
//         .where(eq(recipes.id, input.id));
//       // Create the new recipe ingredients
//       const newIngredients = input.ingredients.filter(
//         (ingredient) => !ingredient?.recipeIngredientId,
//       );
//       if (newIngredients.length > 0) {
//         await ctx.db.insert(recipeIngredients).values(
//           newIngredients.map((ingredient) => ({
//             ...ingredient,
//             recipeId: input.id,
//           })),
//         );
//       }
//       const existingIngredients = input.ingredients.filter(
//         (ingredient) => ingredient?.recipeIngredientId,
//       );
//       if (existingIngredients.length > 0) {
//         await Promise.all(
//           existingIngredients.map((ingredient) =>
//             ctx.db
//               .update(recipeIngredients)
//               .set({
//                 name: ingredient.name,
//                 quantity: ingredient.quantity,
//               })
//               .where(eq(recipeIngredients.id, ingredient.recipeIngredientId!)),
//           ),
//         );
//       }
//     }),
