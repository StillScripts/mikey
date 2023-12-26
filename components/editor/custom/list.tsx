'use client'

import { useState } from 'react'
import { useFieldArray, type UseFormReturn } from 'react-hook-form'

import { Cross1Icon } from '@radix-ui/react-icons'

import type { EditorFormData } from '@/components/editor/editor-zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export const ListInput = ({
	form,
	index
}: {
	form: UseFormReturn<EditorFormData>
	index: number
}) => {
	const [canDelete, setCanDelete] = useState(false)
	const { fields, append, remove } = useFieldArray({
		name: `blocks.${index}.data.items`,
		control: form.control
	})

	return (
		<div>
			<div className="grid grid-cols-1">
				{fields.map((field, listIndex) => (
					<FormField
						key={field.id}
						control={form.control}
						name={`blocks.${index}.data.items.${listIndex}.text`}
						render={({ field }) => (
							<div className="flex space-x-2">
								<span>{listIndex + 1}.</span>
								<FormItem>
									<FormControl>
										<Textarea
											editor
											className="min-w-[200px]"
											placeholder="List item..."
											onKeyUp={e => {
												e.preventDefault()
												if (e.key === 'Enter') {
													append({ text: '' })
												} else if (e.key === 'Backspace') {
													if (
														e.currentTarget.selectionStart === 0 &&
														e.currentTarget.selectionEnd === 0
													) {
														if (canDelete) {
															remove(listIndex)
															setCanDelete(false)
														} else {
															setCanDelete(true)
														}
													}
												}
											}}
											{...field}
										/>
									</FormControl>
								</FormItem>
								<Button
									size="sm"
									variant="ghost"
									className="text-destructive"
									onClick={() => remove(listIndex)}
								>
									<Cross1Icon className="ml-2 h-4 w-4" />
								</Button>
							</div>
						)}
					/>
				))}
			</div>
			<Button
				type="button"
				variant="outline"
				size="sm"
				className="mt-2"
				onClick={() => append({ text: '' })}
			>
				Add List Item
			</Button>
		</div>
	)
}
