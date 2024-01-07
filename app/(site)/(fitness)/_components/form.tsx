'use client'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Cross1Icon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { z } from 'zod'

import { SubmitButton2 } from '@/app/(dashboard)/_components/submit-button'
import {
	createExerciseSession,
	type ExerciseSession,
	updateExerciseSession
} from '@/app/(server)/routers/exercises'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const formSchema = z.object({
	date: z.date({ invalid_type_error: 'Must be a valid date' }),
	notes: z.string(),
	exercises: z.array(
		z.object({
			title: z.string().min(1, { message: 'Required field' }),
			sets: z.coerce.number(),
			reps: z.coerce.number()
		})
	)
})

export type NewExerciseSession = z.infer<typeof formSchema>

export const ExerciseSessionForm = ({
	userId,
	exerciseSession
}: {
	userId: string
	exerciseSession?: ExerciseSession
}) => {
	const sets = exerciseSession?.exerciseSets ?? []
	const router = useRouter()
	const serverAction = exerciseSession?.id
		? updateExerciseSession
		: createExerciseSession
	// TODO use updateExerciseSession if in update mode
	const [state, action] = useFormState(serverAction, {})
	const { toast } = useToast()
	const form = useForm<NewExerciseSession>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			exercises: sets.map(set => ({
				title: set.exerciseTitle!,
				reps: set.reps!
			})),
			notes: exerciseSession?.notes ?? '',
			date: exerciseSession?.date
		}
	})
	const { fields, append, remove } = useFieldArray({
		name: 'exercises',
		control: form.control
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

	const date = form.watch()['date']

	return (
		<Form {...form}>
			<form
				action={async (formData: FormData) => {
					const valid = await form.trigger()
					if (!valid) return
					return action(formData)
				}}
				className="space-y-8"
			>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="grid grid-cols-4 items-start gap-3 sm:grid-cols-5"
					>
						<FormField
							control={form.control}
							name={`exercises.${index}.title`}
							render={({ field }) => (
								<FormItem className="col-span-2 sm:col-span-3">
									<FormLabel>Exercise Name</FormLabel>
									<FormControl>
										<Input placeholder="Push-ups" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="col-span-2 flex items-end space-x-1 sm:space-x-2">
							<FormField
								control={form.control}
								name={`exercises.${index}.sets`}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Sets</FormLabel>
										<FormControl>
											<Input placeholder="1" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`exercises.${index}.reps`}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Reps</FormLabel>
										<FormControl>
											<Input placeholder="10" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								className="text-red-600 hover:text-red-700"
								variant="ghost"
								type="button"
								onClick={() => {
									remove(index)
								}}
							>
								<Cross1Icon />
							</Button>
						</div>
					</div>
				))}
				<Button
					type="button"
					variant="outline"
					onClick={() => append({ title: '', sets: 1, reps: 0 })}
				>
					Add Exercise Set
				</Button>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
					<FormField
						control={form.control}
						name="notes"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Notes</FormLabel>
								<FormControl>
									<Textarea placeholder="Session notes..." {...field} />
								</FormControl>
								<FormDescription>
									Any extra notes about this exercise session (optional)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem className="flex flex-col space-y-4">
								<FormLabel>Session Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[240px] pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={date =>
												date > new Date() || date < new Date('1900-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<input
						type="hidden"
						name="dateString"
						value={`${date}`}
						className="hidden"
					/>
					<input
						type="hidden"
						name="id"
						value={exerciseSession?.id}
						className="hidden"
					/>
					<FormUserId userId={userId} />
				</div>
				<SubmitButton2 className="w-full md:w-auto">Submit</SubmitButton2>
			</form>
		</Form>
	)
}
