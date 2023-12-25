'use client'

import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Loader2 } from 'lucide-react'

import { deletePost } from '@/app/(server)/routers/posts'
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
export const NewPostButtons = () => {
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
			<Button type="submit" disabled={pending} aria-disabled={pending}>
				{pending ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
					</>
				) : (
					'Save Post'
				)}
			</Button>
		</>
	)
}

export const EditPostButtons = ({
	action,
	id,
	slug
}: {
	action: (payload: FormData) => void
	id: number
	slug: string
}) => {
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
		<>
			<Button variant="link" asChild>
				<Link href={`/blog/${slug}`}>View Post</Link>
			</Button>
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

			<Button disabled={pending} aria-disabled={pending} formAction={action}>
				{pending ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
					</>
				) : (
					'Save Changes'
				)}
			</Button>
		</>
	)
}

export const DeletePostMenuItem = ({ id }: { id: number }) => {
	return (
		<DropdownMenuItem>
			<button onClick={async () => await deletePost(id)}>Delete</button>
		</DropdownMenuItem>
	)
}
