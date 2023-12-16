'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

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