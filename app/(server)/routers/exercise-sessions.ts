/* eslint-disable no-console */
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

import { type ActionStatus, getStatus } from '@/lib/utils'

import { getDb } from '@/db/get-connection'
import { exerciseSessions, exerciseSets } from '@/db/schema'

export const createExerciseSession = async (
	state: ActionStatus,
	formData: FormData
) => {
	const id = uuidv4()
	const notes = formData.get('notes') as string
	const date = formData.get('dateString') as string
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
				id,
				notes,
				date: new Date(),
				userId
			})
			.catch(err => {
				console.log(err)
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
					// @ts-expect-error this doesn't matter
					sets.map(set => ({ ...set, exerciseSessionId: recent?.id + 1 }))
				)
				.catch(err => {
					console.log(err)
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
	const sets: number[] = []
	const exerciseSets: { exerciseTitle: string; reps: number; sets: number }[] =
		[]
	for (const [key, value] of formData.entries()) {
		if (key.includes('.title')) {
			titles.push(value.toString())
		} else if (key.includes('.reps')) {
			reps.push(parseInt(value.toString()))
		} else if (key.includes('.sets')) {
			sets.push(parseInt(value.toString()))
		}
	}
	titles.forEach((title, index) => {
		exerciseSets.push({
			exerciseTitle: title,
			reps: reps[index]!,
			sets: sets[index]!
		})
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
			const newSets = sets.filter(set => !set?.id)
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
