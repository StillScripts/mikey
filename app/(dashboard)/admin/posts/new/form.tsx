'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'

import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { NewPostButtons } from '@/app/(dashboard)/admin/posts/buttons'
import { createPost } from '@/app/(server)/routers/posts'
import Editor from '@/components/editor/editor-zod'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export const NewPostForm = () => {
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
				description: 'Your new post was successfully created.',
				action: (
					<ToastAction altText="View all posts">
						<Link href="/admin/posts">View all posts</Link>
					</ToastAction>
				)
			})
		}
	}, [state?.error, state?.success, toast])

	return (
		<form>
			<PageHeading
				heading="Create New Post"
				links={[
					{ title: 'Posts', href: '/admin/posts' },
					{ title: 'New Post', href: '/admin/posts/new' }
				]}
			>
				<NewPostButtons action={create} />
			</PageHeading>
			<div className="grid w-full gap-10">
				{/** Edit header */}
				<div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
					<textarea
						autoFocus
						id="title"
						placeholder="Post title"
						name="title"
						className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
					/>
					<Editor />
				</div>
			</div>
		</form>
	)
}
