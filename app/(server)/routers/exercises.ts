'use server'

import { getDb } from '@/db/get-connection'
import { exerciseSessions, exerciseSets } from '@/db/schema'
import { type ActionStatus, getStatus } from '@/lib/utils'

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
	const sets: { exerciseTitle: string; reps: number; userId: string }[] = []
	for (const [key, value] of formData.entries()) {
		if (key.includes('.title')) {
			titles.push(value.toString())
		} else if (key.includes('.reps')) {
			reps.push(parseInt(value.toString()))
		}
	}
	titles.forEach((title, index) => {
		sets.push({ exerciseTitle: title, reps: reps[index], userId })
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
			await db
				.insert(exerciseSets)
				.values(sets)
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

// update: protectedProcedure
// .input(
// 	z.object({
// 		id: z.number(),
// 		name: z.string().min(1),
// 		description: z.string().optional(),
// 		ingredients: z.array(
// 			z.object({
// 				name: z.string(),
// 				quantity: z.string(),
// 				recipeIngredientId: z.number().optional(),
// 			}),
// 		),
// 	}),
// )
// .mutation(async ({ ctx, input }) => {
// 	// Update the recipe
// 	await ctx.db
// 		.update(recipes)
// 		.set({ name: input.name, description: input.description })
// 		.where(eq(recipes.id, input.id));
// 	// Create the new recipe ingredients
// 	const newIngredients = input.ingredients.filter(
// 		(ingredient) => !ingredient?.recipeIngredientId,
// 	);
// 	if (newIngredients.length > 0) {
// 		await ctx.db.insert(recipeIngredients).values(
// 			newIngredients.map((ingredient) => ({
// 				...ingredient,
// 				recipeId: input.id,
// 			})),
// 		);
// 	}
// 	const existingIngredients = input.ingredients.filter(
// 		(ingredient) => ingredient?.recipeIngredientId,
// 	);
// 	if (existingIngredients.length > 0) {
// 		await Promise.all(
// 			existingIngredients.map((ingredient) =>
// 				ctx.db
// 					.update(recipeIngredients)
// 					.set({
// 						name: ingredient.name,
// 						quantity: ingredient.quantity,
// 					})
// 					.where(eq(recipeIngredients.id, ingredient.recipeIngredientId!)),
// 			),
// 		);
// 	}
// }),
