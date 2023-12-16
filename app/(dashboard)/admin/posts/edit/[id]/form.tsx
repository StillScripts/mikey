'use client'

import { useFormState } from 'react-dom'
import Link from 'next/link'
import { type SinglePost, updatePost } from '@/app/(server)/routers/posts'
import { Editor } from '@/app/(dashboard)/admin/posts/editor'
import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { NewPostButtons } from '@/app/(dashboard)/admin/posts/buttons'

export const EditPostForm = ({ post }: { post: SinglePost }) => {
  const { toast } = useToast()
  const [state, create] = useFormState(updatePost, { ...post })

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
    <form className="p-6">
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
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
          />
          <Editor />
        </div>
      </div>
    </form>
  )
}
