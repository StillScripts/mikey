'use client'

import { deletePost } from '@/app/(server)/routers/posts'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
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
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export const NewPostButtons = ({
  action
}: {
  action: (payload: FormData) => void
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
      <Button disabled={pending} aria-disabled={pending} formAction={action}>
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
      .catch((err) => {
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
