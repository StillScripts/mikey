'use client'
import {
	useFieldArray,
	useFormContext,
	type UseFormReturn
} from 'react-hook-form'

import {
	ArrowDownIcon,
	ArrowUpIcon,
	Cross1Icon,
	HeadingIcon,
	IdCardIcon,
	Link1Icon,
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn, generateBlockId } from '@/lib/utils'

import { CardsInput, ListInput } from './custom'

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
				// THIS IS DIFFERENT TO EDITOR.JS
				items: z.array(z.object({ text: z.string() })).optional(),
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
	const { fields, append, remove, move } = useFieldArray({
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

	const NewBlockDropdown = ({ children }: { children: React.ReactNode }) => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
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
							type: 'link',
							data: {
								link: ''
							}
						})
					}
				>
					<Link1Icon className="mr-2 h-4 w-4" />
					Link
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
	)

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
												className="text-xl font-bold sm:text-2xl"
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
						) : block.type === 'link' ? (
							<FormField
								control={form.control}
								name={`blocks.${index}.data.link`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="Url..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : block.type === 'list' ? (
							<ListInput form={form} index={index} />
						) : block.type === 'cards' ? (
							<CardsInput form={form} index={index} />
						) : null}
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
									<MixerVerticalIcon className="h-5 w-5" />
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
								<DropdownMenuItem
									disabled={index === 0}
									onClick={() => move(index, index - 1)}
								>
									<ArrowUpIcon className="mr-2 h-4 w-4" /> Move Up
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => remove(index)}>
									<Cross1Icon className="mr-2 h-4 w-4" /> Delete
								</DropdownMenuItem>
								<DropdownMenuItem
									disabled={index >= blocks.length - 1}
									onClick={() => move(index, index + 1)}
								>
									<ArrowDownIcon className="mr-2 h-4 w-4" /> Move Down
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						{/** Add new block */}
						<NewBlockDropdown>
							<Button className="mt-6" type="button" size="sm" variant="ghost">
								<PlusCircledIcon className="h-5 w-5" />
							</Button>
						</NewBlockDropdown>
					</div>
				</div>
			))}
			{fields.length === 0 && (
				<NewBlockDropdown>
					<Button type="button" size="sm" variant="ghost">
						<PlusCircledIcon className="mr-2 h-6 w-6" /> Add Your First Block
					</Button>
				</NewBlockDropdown>
			)}
		</div>
	)
}

export default EditorForm
