'use client'
import { useFieldArray, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
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

const sample = {
	time: 1703384217818,
	blocks: [
		{
			id: 'Mald2whe4I',
			type: 'paragraph',
			data: { text: 'Yet another post to test' }
		},
		{
			id: 'oXBm0Y9Oc1',
			type: 'paragraph',
			data: {
				text: 'Woah, this post has been updated! You can be a little old for a lot of things..This'
			}
		},
		{
			id: 'rFbDnUxCKR',
			type: 'cards',
			data: {
				cards: [
					{
						title: 'The first card is cool',
						description: 'This card is super useful'
					},
					{
						title: 'This is another card',
						description: 'I am super happy about this card!'
					}
				],
				heading: 'This is a cards section',
				subheading: 'Wow, have a look at this. It is pretty amazing bro.'
			}
		}
	],
	version: '2.28.2'
}

const formSchema = z.object({
	// timestamp
	time: z.number(),
	// version of app
	version: z.string(),
	blocks: z.array(
		z.object({
			id: z.string(),
			type: z.enum(['header', 'paragraph', 'link', 'list', 'cards']),
			// text
			text: z.string().optional(),
			level: z.number().optional(),
			// list
			style: z.enum(['ordered', 'unordered']).optional(),
			items: z.array(z.string()).optional(),
			// link
			link: z.string().optional(),
			meta: z
				.object({
					title: z.string()
				})
				.optional(),
			// cards
			heading: z.string().min(2).max(200).optional(),
			subheading: z.string().min(2).max(1000).optional(),
			cards: z
				.array(
					z.object({
						title: z.string().min(1, { message: 'Required field' }),
						description: z.string().min(1, { message: 'Required field' })
					})
				)
				.optional()
		})
	)
})

type EditorFormData = z.infer<typeof formSchema>

const EditorForm = () => {
	const form = useForm<EditorFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			blocks: [
				{ id: '77777', type: 'header', level: 1, text: 'This is an example' }
			]
		}
	})
	const { fields, append, remove } = useFieldArray({
		name: 'blocks',
		control: form.control
	})

	function onSubmit(values: EditorFormData) {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{fields.map((block, index) =>
					block.type === 'header' ? (
						<div key={block.id}>
							<FormField
								control={form.control}
								name={`blocks.${index}.text`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Heading Text</FormLabel>
										<FormControl>
											<Input placeholder="Your heading text..." {...field} />
										</FormControl>
										<FormDescription>This is the heading text</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="button"
								onClick={() => remove(index)}
								variant="destructive"
							>
								Delete
							</Button>
						</div>
					) : block.type === 'paragraph' ? (
						<div key={block.id}>
							<FormField
								control={form.control}
								name={`blocks.${index}.text`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Paragraph Text</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Your paragraph text..."
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is the paragraph text
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="button"
								onClick={() => remove(index)}
								variant="destructive"
							>
								Delete
							</Button>
						</div>
					) : (
						<div key={block.id}>Tool not ready...</div>
					)
				)}
				<Button
					type="button"
					onClick={() => append({ id: '12344', type: 'paragraph', text: '' })}
				>
					Add new Paragraph
				</Button>
			</form>
		</Form>
	)
}

export default EditorForm
