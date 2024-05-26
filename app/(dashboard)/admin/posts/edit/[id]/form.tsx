'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'

import { FormContainer } from '@/app/(dashboard)/_components/form-container'
import type { SingleBlock } from '@/app/(server)/routers/blocks'
import { type SinglePost, updatePost } from '@/app/(server)/routers/posts'
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

import { EditPageHeading } from '../edit-page-heading'

export const EditPostForm = ({
	post,
	starters
}: {
	post: SinglePost
	starters: SingleBlock[]
}) => {
	const blocks = JSON.parse(post?.draftContent as string)?.blocks ?? []
	const form = useForm<EditorFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			time: new Date().getTime(),
			blocks,
			version: '2.28.2',
			title: post?.title ?? ''
		}
	})
	const router = useRouter()
	const { toast } = useToast()
	const [state] = useFormState(updatePost, { ...post })

	useEffect(() => {
		if (form.formState?.isSubmitSuccessful) {
			toast({
				title: 'Success',
				description: 'Your new post was successfully updated.',
				action: (
					<ToastAction altText="View all posts">
						<Link href="/admin/posts">View all posts</Link>
					</ToastAction>
				)
			})
			router.refresh()
		}
	}, [form.formState?.isSubmitSuccessful, router, toast])

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
		await updatePost(state, formData)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<EditPageHeading state={state}>
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
				</EditPageHeading>
				<FormContainer>
					<Editor form={form} starters={starters} />
				</FormContainer>
			</form>
		</Form>
	)
}
