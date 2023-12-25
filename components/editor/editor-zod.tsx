'use client'
import { useFieldArray, type UseFormReturn } from 'react-hook-form'

import {
	HeadingIcon,
	IdCardIcon,
	ListBulletIcon,
	PlusCircledIcon,
	TextIcon
} from '@radix-ui/react-icons'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { generateBlockId } from '@/lib/utils'

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

export const formSchema = z.object({
	// not Editor.js, but just the entry title
	title: z.string().min(1, { message: 'Title is required' }),
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

export type EditorFormData = z.infer<typeof formSchema>

const EditorForm = ({ form }: { form: UseFormReturn<EditorFormData> }) => {
	const { fields, append, remove } = useFieldArray({
		name: 'blocks',
		control: form.control
	})

	return (
		<div>
			{fields.map((block, index) =>
				block.type === 'header' ? (
					<div key={block.id}>
						<FormField
							control={form.control}
							name={`blocks.${index}.text`}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											editor
											placeholder="Heading..."
											className="text-xl sm:text-2xl"
											{...field}
										/>
									</FormControl>
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
									<FormControl>
										<Textarea editor placeholder="Paragraph..." {...field} />
									</FormControl>
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
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="mt-6" type="button" size="sm" variant="ghost">
						<PlusCircledIcon className="h-6 w-6" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Add New Block</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							append({
								id: generateBlockId(),
								type: 'header',
								text: '',
								level: 2
							})
						}
					>
						<HeadingIcon className="mr-2 h-4 w-4" /> Heading
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							append({ id: generateBlockId(), type: 'paragraph', text: '' })
						}
					>
						<TextIcon className="mr-2 h-4 w-4" /> Paragraph
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							append({
								id: generateBlockId(),
								type: 'list',
								style: 'unordered',
								items: []
							})
						}
					>
						<ListBulletIcon className="mr-2 h-4 w-4" />
						List
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							append({
								id: generateBlockId(),
								type: 'cards',
								cards: []
							})
						}
					>
						<IdCardIcon className="mr-2 h-4 w-4" />
						Cards
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default EditorForm
