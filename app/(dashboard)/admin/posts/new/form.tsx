'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'

import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { NewPostButtons } from '@/app/(dashboard)/admin/posts/buttons'
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
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { generateBlockId } from '@/lib/utils'

export const NewPostForm = () => {
	const form = useForm<EditorFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			time: new Date().getTime(),
			blocks: [
				{
					id: generateBlockId(),
					type: 'header',
					level: 1,
					text: 'This is an example'
				}
			],
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
				<PageHeading
					heading="Create New Post"
					links={[
						{ title: 'Posts', href: '/admin/posts' },
						{ title: 'New Post', href: '/admin/posts/new' }
					]}
				>
					<NewPostButtons />
				</PageHeading>
				<div className="grid w-full gap-10">
					{/** Edit header */}
					<div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<textarea
											autoFocus
											placeholder="Post title"
											className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Editor form={form} />
					</div>
				</div>
			</form>
		</Form>
	)
}
