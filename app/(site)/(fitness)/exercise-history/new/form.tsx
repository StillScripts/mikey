'use client'
import { useFieldArray, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Cross1Icon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { z } from 'zod'

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
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const formSchema = z.object({
	date: z.date({ invalid_type_error: 'Must be a valid date' }),
	notes: z.string(),
	exercises: z.array(
		z.object({
			title: z.string().min(1, { message: 'Required field' }),
			reps: z.coerce.number()
		})
	)
})

export type NewExerciseSession = z.infer<typeof formSchema>

export const ExerciseSessionForm = () => {
	const form = useForm<NewExerciseSession>({
		resolver: zodResolver(formSchema)
	})
	const { fields, append, remove } = useFieldArray({
		name: 'exercises',
		control: form.control
	})

	function onSubmit(values: NewExerciseSession) {
		console.log(JSON.stringify(values))
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
					onClick={() => append({ title: '', reps: 0 })}
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
				</div>
				<Button className="w-full md:w-auto" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	)
}
