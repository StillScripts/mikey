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
import { createExercise } from '@/app/(server)/routers/exercises'
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
	FormUserId
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

export const ExerciseForm = ({
	title = 'Add A New Exercise',
	userId
}: {
	title?: string
	userId: string
}) => {
	const router = useRouter()
	const [state, action] = useFormState(createExercise, {})
	const { toast } = useToast()
	const form = useForm<NewExercise>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userId
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
				description: 'Your exercise session was successfully recorded.',
				action: (
					<ToastAction altText="View all exercises">
						<Link href="/">View all exercises</Link>
					</ToastAction>
				)
			})
			router.refresh()
		}
	}, [router, state?.error, state?.success, toast])

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
							<CardDescription>
								Create a new exercise that you can add to workouts
							</CardDescription>
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
							<FormUserId userId={userId} />
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
