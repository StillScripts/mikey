'use client'

import { useState } from 'react'
import {
	useFieldArray,
	useFormContext,
	type UseFormReturn
} from 'react-hook-form'

import { Cross1Icon } from '@radix-ui/react-icons'

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
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import type { EditorFormData } from '../editor-zod'
import {
	CardsPreview,
	CardsProvider
} from '../editorJs/tools/cards-tool/context'
import { CardsSection } from '@/components/ui/cards-section'

export const CardsForm = ({
	form,
	index
}: {
	form: UseFormReturn<EditorFormData>
	index: number
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
			<div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
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
				className="mt-2"
				onClick={() => append({ title: '', description: '' })}
			>
				Add Card
			</Button>
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
	const { watch } = useFormContext<EditorFormData>()
	const [blocks] = watch(['blocks'])

	return (
		<Card className="mt-4 rounded-none border-stone-400 shadow-none">
			<CardHeader className="flex flex-row justify-between">
				<p className="my-0 text-lg text-muted-foreground">Cards Section</p>
				<div className="flex items-center space-x-2">
					<Switch
						id="edit-cards"
						checked={edit}
						onCheckedChange={() => setEdit(!edit)}
					/>
					<Label htmlFor="edit-cards">Edit</Label>
				</div>
			</CardHeader>
			<CardContent>
				{edit ? <CardsForm form={form} index={index} /> : <CardsSection />}
			</CardContent>
		</Card>
	)
}
