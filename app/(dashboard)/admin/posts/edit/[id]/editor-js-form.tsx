'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Breadcrumbs } from '@/app/(dashboard)/_components/breadcrumbs'
import { EditPostButtons } from '@/app/(dashboard)/admin/posts/buttons'
import { type SinglePost, updatePost } from '@/app/(server)/routers/posts'
import { Editor } from '@/components/editor/editorJs/editor'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

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
			<div className="pb-8">
				<Breadcrumbs
					links={[
						{ title: 'Posts', href: '/admin/posts' },
						// @ts-expect-error this is a valid route
						{ title: 'Edit Post', href: `/admin/posts/edit/${state?.id}` }
					]}
				/>
				<div className="mt-2 md:flex md:items-center md:justify-between">
					<div className="min-w-0 flex-1">
						<Textarea
							autoFocus
							placeholder="Post title"
							editor
							id="title"
							name="title"
							defaultValue={state?.title}
							className="text-2xl font-bold sm:text-3xl"
						/>
					</div>
					<div className="mt-4 flex flex-shrink-0 space-x-3 md:ml-4 md:mt-0">
						{state?.id && (
							<EditPostButtons
								action={update}
								id={state.id}
								slug={state.slug!}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="grid w-full gap-10">
				{/** Edit header */}
				<div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
					<Editor data={state?.draftContent as string} />
				</div>
			</div>
		</form>
	)
}
