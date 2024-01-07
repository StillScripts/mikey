'use server'

import { eq } from 'drizzle-orm'

import { getDb } from '@/db/get-connection'
import { exercises, exerciseSessions, exerciseSets } from '@/db/schema'
import { type ActionStatus, getStatus } from '@/lib/utils'

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
	const title = formData.get('title') as string
	const description = formData.get('description') as string
	const userId = formData.get('userId') as string
	await db.insert(exercises).values({
		title,
		description,
		userId
	})
	return getStatus('success')
}

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

export const createExerciseSession = async (
	state: ActionStatus,
	formData: FormData
) => {
	const notes = formData.get('notes') as string
	// for some reason this isn't working
	const date = formData.get('dateString') as string
	console.log(date)
	const userId = formData.get('userId') as string
	const db = await getDb()
	const titles: string[] = []
	const reps: number[] = []
	const sets: { exerciseTitle: string; reps: number }[] = []
	for (const [key, value] of formData.entries()) {
		if (key.includes('.title')) {
			titles.push(value.toString())
		} else if (key.includes('.reps')) {
			reps.push(parseInt(value.toString()))
		}
	}
	titles.forEach((title, index) => {
		sets.push({ exerciseTitle: title, reps: reps[index] })
	})

	if (notes && userId) {
		await db
			.insert(exerciseSessions)
			.values({
				notes,
				date: new Date(),
				userId
			})
			.catch(err => {
				console.log(err?.message)
				return getStatus('error')
			})
			.finally(() => {
				console.log({
					notes,
					date: new Date(),
					userId
				})
			})
		if (sets.length > 0) {
			const recent = await db.query.exerciseSessions.findFirst()
			await db
				.insert(exerciseSets)
				.values(
					// @ts-ignore
					sets.map(set => ({ ...set, exerciseSessionId: recent?.id + 1 }))
				)
				.catch(err => {
					console.log(err?.message)
					return getStatus('error')
				})
				.finally(() => {
					console.log(sets)
				})
		}
	}

	return getStatus('success')
}

export const updateExerciseSession = async (
	state: ActionStatus,
	formData: FormData
) => {
	console.log('gayyyy')
	const notes = formData.get('notes') as string
	// for some reason this isn't working
	const date = formData.get('dateString') as string
	console.log(date)
	const id = formData.get('id') as string
	console.log(id)
	const userId = formData.get('userId') as string
	const db = await getDb()
	const titles: string[] = []
	const reps: number[] = []
	const sets: { exerciseTitle: string; reps: number }[] = []
	for (const [key, value] of formData.entries()) {
		if (key.includes('.title')) {
			titles.push(value.toString())
		} else if (key.includes('.reps')) {
			reps.push(parseInt(value.toString()))
		}
	}
	titles.forEach((title, index) => {
		sets.push({ exerciseTitle: title, reps: reps[index] })
	})

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
		if (sets.length > 0) {
			console.log(sets)
			const recent = await db.query.exerciseSessions.findFirst()
			// await db
			// 	.insert(exerciseSets)
			// 	.values(
			// 		// @ts-ignore
			// 		sets.map(set => ({ ...set, exerciseSessionId: recent?.id + 1 }))
			// 	)
			// 	.catch(err => {
			// 		console.log(err?.message)
			// 		return getStatus('error')
			// 	})
			// 	.finally(() => {
			// 		console.log(sets)
			// 	})
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
