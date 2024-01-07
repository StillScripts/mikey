'use client'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { FormContainer } from '@/app/(dashboard)/_components/form-container'
import { SubmitButton2 } from '@/app/(dashboard)/_components/submit-button'
import {
	createExercise,
	type Exercise,
	updateExercise
} from '@/app/(server)/routers/exercises'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	HiddenField
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
	title: z.string().min(1, { message: 'Required field' }),
	description: z.string().optional(),
	userId: z.string()
})

export type NewExercise = z.infer<typeof formSchema>
export type ExerciseFormKey = keyof NewExercise

export const ExerciseForm = ({
	title = 'Add A New Exercise',
	description = 'Create a new exercise that you can add to workouts',
	userId,
	exercise
}: {
	title?: string
	description?: string
	userId: string
	exercise?: Exercise
}) => {
	const router = useRouter()
	const serverAction = exercise?.id ? updateExercise : createExercise
	const [state, action] = useFormState(serverAction, {})
	const { toast } = useToast()
	const form = useForm<NewExercise>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userId,
			title: exercise?.title ?? '',
			description: exercise?.description ?? ''
		}
	})

	useEffect(() => {
		if (state?.error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'An error occured when saving this data.'
			})
		} else if (state?.success) {
			toast({
				title: 'Success',
				description: 'Your exercise was successfully recorded.',
				action: (
					<ToastAction altText="View all exercises">
						<Link href="/">View all exercises</Link>
					</ToastAction>
				)
			})
			if (!exercise?.id && state?.id) {
				// // @ts-expect-error this should be valid
				router.push(`/admin/exercises/edit/${state?.id}`)
			}
			router.refresh()
		}
	}, [exercise?.id, router, state?.error, state?.id, state?.success, toast])

	return (
		<FormContainer>
			<Form {...form}>
				<form
					action={async (formData: FormData) => {
						const valid = await form.trigger()
						if (!valid) return
						return action(formData)
					}}
				>
					<Card>
						<CardHeader>
							<CardTitle>{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Exercise Title</FormLabel>
										<FormControl>
											<Input placeholder="Push-ups" {...field} />
										</FormControl>
										<FormDescription>
											The name which will be used for the exercise
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Exercise Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Exercise description..."
												{...field}
											/>
										</FormControl>
										<FormDescription>
											A basic description of the type of exercise (optional)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<HiddenField name="userId" value={userId} />
							{exercise?.id && <HiddenField name="id" value={exercise.id} />}
						</CardContent>
						<CardFooter>
							<SubmitButton2 className="w-full md:w-auto">Submit</SubmitButton2>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</FormContainer>
	)
}
