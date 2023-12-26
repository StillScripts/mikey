'use client'

import { useFieldArray, type UseFormReturn } from 'react-hook-form'

import type { EditorFormData } from '@/components/editor/editor-zod'
import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const ListInput = ({
	form,
	index
}: {
	form: UseFormReturn<EditorFormData>
	index: number
}) => {
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
										<Textarea editor placeholder="List item..." {...field} />
									</FormControl>
								</FormItem>
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
