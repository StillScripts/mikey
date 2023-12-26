'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'

import { Breadcrumbs } from '@/app/(dashboard)/_components/breadcrumbs'
import { NewPostButtons } from '@/app/(dashboard)/admin/posts/buttons'
import { createPost } from '@/app/(server)/routers/posts'
import Editor, {
	type EditorFormData,
	formSchema
} from '@/components/editor/editor-zod'
import { Editor as EditorJsForm } from '@/components/editor/editorJs/editor'
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

export const NewPostForm = () => {
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

	const isEditorJs = false

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="pb-8">
					<Breadcrumbs
						links={[
							{ title: 'Posts', href: '/admin/posts' },
							{ title: 'New Post', href: '/admin/posts/new' }
						]}
					/>
					<div className="mt-2 md:flex md:items-center md:justify-between">
						<div className="min-w-0 flex-1">
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
												className="text-2xl sm:text-3xl"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="mt-4 flex flex-shrink-0 space-x-3 md:ml-4 md:mt-0">
							<NewPostButtons />
						</div>
					</div>
				</div>
				<div className="grid w-full gap-10">
					{/** Edit header */}
					<div className="prose prose-stone mx-auto w-full  max-w-none dark:prose-invert">
						{isEditorJs ? <EditorJsForm /> : <Editor form={form} />}
					</div>
				</div>
			</form>
		</Form>
	)
}
