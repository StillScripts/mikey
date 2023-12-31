'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'

import { EditorContainer } from '@/app/(dashboard)/_components/editor-container'
import type { SingleBlock } from '@/app/(server)/routers/blocks'
import { createPost } from '@/app/(server)/routers/posts'
import { type EditorFormData, formSchema } from '@/components/editor/editor-zod'
import { Editor } from '@/components/editor/editorJs/editor'
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

export const NewPostFormEditorJs = ({
	starters
}: {
	starters: SingleBlock[]
}) => {
	const form = useForm<EditorFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			time: new Date().getTime(),
			blocks: [],
			version: '2.28.2'
		}
	})
	const router = useRouter()
	const { toast } = useToast()
	const [state, create] = useFormState(createPost, {})

	useEffect(() => {
		if (state?.error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'An error occured when saving this data.'
			})
		} else if (state?.success) {
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
	}, [router, state?.error, state?.success, toast])

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

	return (
		<form className="space-y-8">
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
			<EditorContainer>
				<Editor />
			</EditorContainer>
		</form>
	)
}
