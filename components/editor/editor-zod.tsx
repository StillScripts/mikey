'use client'
import { useMemo } from 'react'
import {
	useFieldArray,
	useFormContext,
	type UseFormReturn
} from 'react-hook-form'

import {
	HeadingIcon,
	IdCardIcon,
	ListBulletIcon,
	MixerVerticalIcon,
	PlusCircledIcon,
	TextIcon
} from '@radix-ui/react-icons'
import {
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6
} from 'lucide-react'
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
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn, generateBlockId } from '@/lib/utils'

import { CardsInput } from './custom/cards'

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
			data: z.object({
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
		})
	)
})

export type EditorFormData = z.infer<typeof formSchema>

const EditorForm = ({ form }: { form: UseFormReturn<EditorFormData> }) => {
	const { setValue, watch } = useFormContext<EditorFormData>()
	const { fields, append, remove } = useFieldArray({
		name: 'blocks',
		control: form.control
	})

	const getHeadingIcon = (level: number) => {
		switch (level) {
			case 1:
				return Heading1
			case 2:
				return Heading2
			case 3:
				return Heading3
			case 4:
				return Heading4
			case 5:
				return Heading5
			case 6:
				return Heading6
			default:
				throw new Error('Level should always be 1-6')
		}
	}

	const [blocks] = watch(['blocks'])

	/** Track the heading levels */
	const levels: Record<number, number | undefined> = {}
	blocks.forEach((block, index) => {
		if (block.type === 'header') {
			levels[index] = block.data?.level
		}
	})

	return (
		<div>
			{fields.map((block, index) => (
				<div className="flex items-start justify-between" key={block.id}>
					<div>
						{block.type === 'header' ? (
							<FormField
								control={form.control}
								name={`blocks.${index}.data.text`}
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
						) : block.type === 'paragraph' ? (
							<FormField
								control={form.control}
								name={`blocks.${index}.data.text`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea editor placeholder="Paragraph..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : block.type === 'cards' ? (
							<CardsInput form={form} index={index} />
						) : (
							<div>Not ready...</div>
						)}
					</div>
					<div className="flex items-center">
						{/** Edit this block */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className="mt-6"
									type="button"
									size="sm"
									variant="ghost"
								>
									<MixerVerticalIcon className="h-6 w-6" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Manage</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{block.type === 'header' && (
									<>
										{[1, 2, 3, 4, 5, 6].map(level => {
											const Icon = getHeadingIcon(level)
											const currentLevel = levels[index]
											console.log(currentLevel)
											return (
												<DropdownMenuItem
													key={`level-${level}`}
													className={cn(currentLevel === level && 'bg-accent')}
													onClick={() => {
														setValue(`blocks.${index}.data.level`, level)
													}}
												>
													<Icon className="mr-2 h-5 w-5" /> Heading&nbsp;
													{level}
												</DropdownMenuItem>
											)
										})}

										<DropdownMenuSeparator />
									</>
								)}

								<DropdownMenuItem onClick={() => remove(index)}>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						{/** Add new block */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className="mt-6"
									type="button"
									size="sm"
									variant="ghost"
								>
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
											data: {
												text: '',
												level: 2
											}
										})
									}
								>
									<HeadingIcon className="mr-2 h-4 w-4" /> Heading
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										append({
											id: generateBlockId(),
											type: 'paragraph',
											data: {
												text: ''
											}
										})
									}
								>
									<TextIcon className="mr-2 h-4 w-4" /> Paragraph
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										append({
											id: generateBlockId(),
											type: 'list',
											data: {
												style: 'unordered',
												items: []
											}
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
											data: {
												cards: []
											}
										})
									}
								>
									<IdCardIcon className="mr-2 h-4 w-4" />
									Cards
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			))}
			{fields.length === 0 && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="mt-6" type="button" size="sm" variant="ghost">
							<PlusCircledIcon className="mr-2 h-6 w-6" /> Add Your First Block
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
									data: {
										text: '',
										level: 2
									}
								})
							}
						>
							<HeadingIcon className="mr-2 h-4 w-4" /> Heading
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								append({
									id: generateBlockId(),
									type: 'paragraph',
									data: { text: '' }
								})
							}
						>
							<TextIcon className="mr-2 h-4 w-4" /> Paragraph
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								append({
									id: generateBlockId(),
									type: 'list',
									data: {
										style: 'unordered',
										items: []
									}
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
									data: {
										cards: []
									}
								})
							}
						>
							<IdCardIcon className="mr-2 h-4 w-4" />
							Cards
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	)
}

export default EditorForm
