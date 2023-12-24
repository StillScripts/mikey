'use client'
import { useState } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function ToolContainer<T extends object>({
	data,
	onChange,
	Form,
	Preview,
	Provider
}: {
	data: Partial<T>
	onChange: (data: Partial<T>) => void
	Form: ({ onChange }: { onChange: (data: Partial<T>) => void }) => JSX.Element
	Preview: () => JSX.Element
	Provider: ({
		data,
		children
	}: {
		data: Partial<T>
		children: React.ReactNode
	}) => JSX.Element
}) {
	const [edit, setEdit] = useState(false)
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
				<Provider data={data}>
					{edit ? <Form onChange={onChange} /> : <Preview />}
				</Provider>
			</CardContent>
		</Card>
	)
}
