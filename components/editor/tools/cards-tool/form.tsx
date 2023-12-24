'use client'

import { useFieldArray, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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

const formSchema = z.object({
	heading: z.string().min(2).max(200).optional(),
	subheading: z.string().min(2).max(1000).optional(),
	cards: z.array(
		z.object({
			heading: z.string().min(1, { message: 'Required field' }),
			description: z.string().min(1, { message: 'Required field' })
		})
	)
})

export const CardsToolForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			heading: '',
			subheading: '',
			cards: []
		}
	})
	const { fields, append, remove } = useFieldArray({
		name: 'cards',
		control: form.control
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

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
					name="heading"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Section Subheading</FormLabel>
							<FormControl>
								<Input placeholder="Section subheading..." {...field} />
							</FormControl>
							<FormDescription>
								This is the section subheading text (optional)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
