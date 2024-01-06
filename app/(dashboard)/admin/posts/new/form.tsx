'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'

import { FormContainer } from '@/app/(dashboard)/_components/form-container'
import type { SingleBlock } from '@/app/(server)/routers/blocks'
import { createPost } from '@/app/(server)/routers/posts'
import Editor, {
	type EditorFormData,
	formSchema
} from '@/components/editor/editor-zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

import { NewPostHeading } from './new-post-heading'

export const NewPostForm = ({ starters }: { starters: SingleBlock[] }) => {
	const form = useForm<EditorFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			time: new Date().getTime(),
			blocks: [],
			version: '2.28.2'
		}
	})
	const { toast } = useToast()
	const [state] = useFormState(createPost, {})

	useEffect(() => {
		if (form.formState?.isSubmitSuccessful) {
			toast({
				title: 'Success',
				description: 'Your new post was successfully created.',
				action: (
					<ToastAction altText="View all posts">
						<Link href="/admin/posts">View all posts</Link>
					</ToastAction>
				)
			})
		}
	}, [form.formState?.errors, form.formState?.isSubmitSuccessful, toast])

	/** Convert values into form data then run server action */
	async function onSubmit(values: EditorFormData) {
		const title = values.title
		const blocks = JSON.stringify({
			time: new Date().getTime(),
			version: '2.28.2',
			blocks: values.blocks
		})
		const formData = new FormData()
		formData.append('title', title)
		formData.append('blocks', blocks)
		await createPost(state, formData)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<NewPostHeading>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										autoFocus
										placeholder="Post title"
										editor
										className="text-2xl font-bold sm:text-3xl"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</NewPostHeading>
				<FormContainer>
					<Editor form={form} starters={starters} />
				</FormContainer>
			</form>
		</Form>
	)
}
