'use client'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Cross1Icon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { z } from 'zod'

import { SubmitButton2 } from '@/app/(dashboard)/_components/submit-button'
import {
	createExercise,
	type ExerciseSession
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
	FormMessage
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const formSchema = z.object({
	date: z.date({ invalid_type_error: 'Must be a valid date' }),
	title: z.string().min(1, { message: 'Required field' }),
	description: z.string(),
	userId: z.string()
})

export type NewExercise = z.infer<typeof formSchema>

export const ExerciseForm = ({
	userId,
	exerciseSession
}: {
	userId: string
	exerciseSession?: ExerciseSession
}) => {
	const [state, update] = useFormState(createExercise, {})
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
	}, [])

	const date = form.watch()['date']

	return (
		<Form {...form}>
			<form
				action={async (formData: FormData) => {
					const valid = await form.trigger()
					if (!valid) return
					return update(formData)
				}}
				className="space-y-8"
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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
						type="date"
						name="dateString"
						value={date?.getTime()}
						className="hidden"
					/>
				</div>
				<SubmitButton2 className="w-full md:w-auto">Submit</SubmitButton2>
			</form>
		</Form>
	)
}
