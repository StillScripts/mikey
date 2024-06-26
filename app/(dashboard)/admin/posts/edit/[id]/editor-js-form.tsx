'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FormContainer } from '@/app/(dashboard)/_components/form-container'
import { type SinglePost, updatePost } from '@/app/(server)/routers/posts'
import { Editor } from '@/components/editor/editorJs/editor'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

import { EditPageHeading } from '../edit-page-heading'

export const EditPostForm = ({ post }: { post: SinglePost }) => {
	const router = useRouter()
	const { toast } = useToast()
	const [state, update] = useFormState(updatePost, { ...post })

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

	return (
		<form>
			<EditPageHeading state={state} action={update}>
				<Textarea
					autoFocus
					placeholder="Post title"
					editor
					id="title"
					name="title"
					defaultValue={state?.title}
					className="text-2xl font-bold sm:text-3xl"
				/>
			</EditPageHeading>
			<FormContainer>
				<Editor data={state?.draftContent as string} />
			</FormContainer>
		</form>
	)
}
