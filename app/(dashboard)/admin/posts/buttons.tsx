'use client'

import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
	ActionProps,
	SubmitButton
} from '@/app/(dashboard)/_components/submit-button'
import { deletePost } from '@/app/(server)/routers/posts'
import { useSettings } from '@/components/providers'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'

/** Header buttons in new post form. State is managed by `react-hook-form` */
export const NewPostButtonsCustom = () => {
	const { isValidating, isSubmitting } = useFormState()
	const pending = isValidating || isSubmitting
	return (
		<>
			<Button
				type="button"
				variant="outline"
				disabled={pending}
				aria-disabled={pending}
				asChild
			>
				<Link href="/admin/posts">Discard</Link>
			</Button>
			<SubmitButton pending={pending} />
		</>
	)
}

/** Header buttons in new post form. State is managed by the server action */
export const NewPostButtonsEditorJs = ({
	action
}: {
	action?: (payload: FormData) => void
}) => {
	const { pending } = useFormStatus()
	return (
		<>
			<Button
				type="button"
				variant="outline"
				disabled={pending}
				aria-disabled={pending}
				asChild
			>
				<Link href="/admin/posts">Discard</Link>
			</Button>
			<SubmitButton action={action} pending={pending} />
		</>
	)
}

export const NewPostButtons = ({ action }: ActionProps) => {
	const { defaultEditor } = useSettings()

	return defaultEditor === 'editor-js' ? (
		<NewPostButtonsEditorJs action={action} />
	) : (
		<NewPostButtonsCustom />
	)
}

export const EditPostButtonsCustom = ({
	id,
	slug
}: {
	id: string
	slug: string
}) => {
	const { isValidating, isSubmitting } = useFormState()
	const pending = isValidating || isSubmitting

	return (
		<>
			<Button variant="link" asChild>
				<Link href={`/blog/${slug}`}>View Post</Link>
			</Button>
			<DeleteButton id={id} />
			<SubmitButton pending={pending} />
		</>
	)
}

export const EditPostButtonsEditorJs = ({
	action,
	id,
	slug
}: {
	action?: (payload: FormData) => void
	id: string
	slug: string
}) => {
	const { pending } = useFormStatus()

	return (
		<>
			<Button variant="link" asChild>
				<Link href={`/blog/${slug}`}>View Post</Link>
			</Button>
			<DeleteButton id={id} />
			<SubmitButton action={action} pending={pending} />
		</>
	)
}

export const EditPostButtons = ({
	action,
	id,
	slug
}: ActionProps & { id: string; slug: string }) => {
	const { defaultEditor } = useSettings()

	return defaultEditor === 'editor-js' ? (
		<EditPostButtonsEditorJs action={action} id={id} slug={slug} />
	) : (
		<EditPostButtonsCustom id={id} slug={slug} />
	)
}

export const DeleteButton = ({ id }: { id: string }) => {
	const router = useRouter()
	const { toast } = useToast()
	const { pending } = useFormStatus()
	const handleDelete = async () => {
		await deletePost(id)
			.then(() => {
				toast({
					title: 'Success',
					description: 'Your post was successfully deleted.'
				})
				router.push('/admin/posts')
			})
			.catch(err => {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description:
						'An error occured when deleting this post. ' + err?.message ?? ''
				})
			})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					type="button"
					variant="destructive"
					disabled={pending}
					aria-disabled={pending}
				>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will delete this review.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export const DeletePostMenuItem = ({ id }: { id: string }) => {
	return (
		<DropdownMenuItem>
			<button onClick={async () => await deletePost(id)}>Delete</button>
		</DropdownMenuItem>
	)
}
