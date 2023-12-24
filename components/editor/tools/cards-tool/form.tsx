'use client'

import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Cross1Icon } from '@radix-ui/react-icons'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { useCards } from './cards-tool'

const formSchema = z.object({
	heading: z.string().min(2).max(200).optional(),
	subheading: z.string().min(2).max(1000).optional(),
	cards: z.array(
		z.object({
			title: z.string().min(1, { message: 'Required field' }),
			description: z.string().min(1, { message: 'Required field' })
		})
	)
})

export type CardsToolData = z.infer<typeof formSchema>
export interface CardsToolProps {
	data: Partial<CardsToolData>
	onChange: (data: Partial<CardsToolData>) => void
}

export const CardsToolForm = ({ onChange }: CardsToolProps) => {
	const data = useCards()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			heading: data.heading ?? '',
			subheading: data.subheading ?? '',
			cards: data.cards ?? []
		}
	})
	const { fields, append, remove } = useFieldArray({
		name: 'cards',
		control: form.control
	})

	function onSubmit(values: CardsToolData) {
		// This could be useful for saving the cards as a reusable component
		console.log(values)
	}

	const values = form.watch()

	useEffect(() => {
		console.log(values)
		onChange && onChange(values)
	}, [values, onChange])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="heading"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Section Heading</FormLabel>
							<FormControl>
								<Input placeholder="Section heading..." {...field} />
							</FormControl>
							<FormDescription>
								This is the section heading text
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="subheading"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Section Subheading</FormLabel>
							<FormControl>
								<Textarea placeholder="Section subheading..." {...field} />
							</FormControl>
							<FormDescription>
								This is the section subheading text (optional)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
					{fields.map((field, index) => (
						<Card key={field.id}>
							<CardHeader className="m-0 flex flex-row items-center justify-between py-0">
								<CardTitle className="text-lg">Card {index + 1}</CardTitle>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={() => remove(index)}
								>
									<Cross1Icon className="h-4 w-4" />
								</Button>
							</CardHeader>
							<CardContent>
								<FormField
									control={form.control}
									name={`cards.${index}.title`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Card Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Add a title..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`cards.${index}.description`}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Card Description</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													placeholder="Add a description..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					))}
				</div>
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="mt-2"
					onClick={() => append({ title: '', description: '' })}
				>
					Add Card
				</Button>
			</form>
		</Form>
	)
}
