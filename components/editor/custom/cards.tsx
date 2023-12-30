'use client'

import { useState } from 'react'
import {
	useFieldArray,
	useFormContext,
	type UseFormReturn
} from 'react-hook-form'

import { Cross1Icon } from '@radix-ui/react-icons'

import type { EditorFormData } from '@/components/editor/editor-zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CardsSection } from '@/components/ui/cards-section'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

export const SaveStarter = ({ data }: { data: object }) => {
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')

	const save = () => {
		const content = JSON.stringify(data)
		const formData = new FormData()
		formData.set('title', title)
		formData.set('content', content)
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" size="sm" className="ml-3 mt-4">
					Save As Starter
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Starter</DialogTitle>
					<DialogDescription>
						Save this block as a starter component that you can easily reuse.
						Give it a title that makes it easy to know what this block contains.
					</DialogDescription>
				</DialogHeader>
				<Input
					placeholder="Title"
					onChange={e => setTitle(e.target.value)}
					value={title}
				/>
				<DialogFooter>
					<Button
						type="button"
						disabled={!title}
						aria-disabled={!title}
						className="mt-5"
						onClick={() => setOpen(false)}
					>
						Save Block
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export const CardsForm = ({
	form,
	index,
	data
}: {
	form: UseFormReturn<EditorFormData>
	index: number
	data: object
}) => {
	const { fields, append, remove } = useFieldArray({
		name: `blocks.${index}.data.cards`,
		control: form.control
	})

	return (
		<div>
			<FormField
				control={form.control}
				name={`blocks.${index}.data.heading`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Section Heading</FormLabel>
						<FormControl>
							<Input placeholder="Section heading..." {...field} />
						</FormControl>
						<FormDescription>This is the section heading text</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name={`blocks.${index}.data.subheading`}
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
			<div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
				{fields.map((field, cardIndex) => (
					<Card key={field.id}>
						<CardHeader className="m-0 flex flex-row items-center justify-between py-0">
							<CardTitle className="text-lg">Card {cardIndex + 1}</CardTitle>
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
								name={`blocks.${index}.data.cards.${cardIndex}.title`}
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
								name={`blocks.${index}.data.cards.${cardIndex}.description`}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Card Description</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Add a description..." />
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
				className="mt-4"
				onClick={() => append({ title: '', description: '' })}
			>
				Add Card
			</Button>
			<SaveStarter data={data} />
		</div>
	)
}

export function CardsInput<T extends object>({
	form,
	index
}: {
	form: UseFormReturn<EditorFormData>
	index: number
}) {
	const [edit, setEdit] = useState(false)
	const [starter, setStarter] = useState('')
	const { setValue, watch } = useFormContext<EditorFormData>()
	const [blocks] = watch(['blocks'])
	const { data } = blocks[index]

	const hasData = data?.heading || data?.subheading || data?.cards?.length

	const defaultCards = {
		heading: 'Learn More',
		subheading: '',
		cards: [{ title: 'Explore Our Blogs' }]
	}

	const getStarted = () => {
		if (starter === 'default') {
			setValue(`blocks.${index}.data.heading`, defaultCards.heading)
			setValue(`blocks.${index}.data.subheading`, defaultCards.subheading)
			setValue(`blocks.${index}.data.cards`, defaultCards.cards)
		}
	}

	return (
		<Card className="my-6 w-full rounded-none border-stone-400 shadow-none">
			<CardHeader className="flex flex-row justify-between">
				<p className="my-0 text-lg text-muted-foreground">Cards Section</p>
				<div className="flex items-center space-x-2">
					<Switch
						id="edit-cards"
						checked={edit}
						onCheckedChange={() => setEdit(!edit)}
						disabled={!hasData}
						aria-disabled={!hasData}
					/>
					<Label htmlFor="edit-cards">Edit</Label>
				</div>
			</CardHeader>
			<CardContent>
				{hasData ? (
					edit ? (
						<CardsForm form={form} index={index} data={data} />
					) : (
						<CardsSection {...data} />
					)
				) : (
					<div>
						<Select
							onValueChange={value => {
								setStarter(value)
							}}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select a starter" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="default">Default Cards</SelectItem>
							</SelectContent>
						</Select>
						<Button
							type="button"
							className="mt-4"
							onClick={getStarted}
							disabled={!starter}
							aria-disabled={!starter}
						>
							Get Started
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
