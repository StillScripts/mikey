'use client'
import { useFieldArray, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Cross1Icon } from '@radix-ui/react-icons'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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
import { Textarea } from '@/components/ui/textarea'
import { H2 } from '@/components/ui/typography'

const formSchema = z.object({
	date: z.date(),
	notes: z.string(),
	exercises: z.array(
		z.object({
			title: z.string().min(1, { message: 'Required field' }),
			reps: z.number()
		})
	)
})

export const ExerciseSessionForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})
	const { fields, append, remove } = useFieldArray({
		name: 'exercises',
		control: form.control
	})

	function onSubmit(values: any) {}

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
					</div>
					<Button className="w-full md:w-auto" type="submit">
						Submit
					</Button>
				</form>
			</Form>
	)
}
