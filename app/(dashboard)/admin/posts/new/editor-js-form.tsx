'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FormContainer } from '@/app/(dashboard)/_components/form-container'
import type { SingleBlock } from '@/app/(server)/routers/blocks'
import { createPost } from '@/app/(server)/routers/posts'
import { Editor } from '@/components/editor/editorJs/editor'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

import { NewPostHeading } from './new-post-heading'

export const NewPostFormEditorJs = ({
	starters
}: {
	starters: SingleBlock[]
}) => {
	const router = useRouter()
	const { toast } = useToast()
	const [state, create] = useFormState(createPost, {})

	useEffect(() => {
		if (state?.error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'An error occured when creating this post.'
			})
		} else if (state?.success) {
			toast({
				title: 'Success',
				description: 'Your new post was successfully created.',
				action: (
					<ToastAction altText="View all posts">
						<Link href="/admin/posts">View all posts</Link>
					</ToastAction>
				)
			})
			router.refresh()
		}
	}, [router, state?.error, state?.success, toast])

	return (
		<form className="space-y-8">
			<NewPostHeading action={create}>
				<Textarea
					autoFocus
					placeholder="Post title"
					editor
					id="title"
					name="title"
					className="text-2xl font-bold sm:text-3xl"
					required
				/>
			</NewPostHeading>
			<FormContainer>
				<Editor />
			</FormContainer>
		</form>
	)
}
