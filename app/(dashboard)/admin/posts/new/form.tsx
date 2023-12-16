'use client'

import { useFormState } from 'react-dom'
import Link from 'next/link'
import { createPost } from '@/app/(server)/routers/posts'
import { Editor } from './editor'
import { PageHeading } from '@/app/(dashboard)/_components/page-heading'

export const NewPostForm = () => {
  const returnUrl = '/admin/posts'
  const [state, create] = useFormState(createPost, {})

  return (
    <form>
      {/* <PageHeading></PageHeading> */}
      <div className="grid w-full gap-10">
        {/** Edit header */}
        <div className="flex w-full items-center justify-end space-x-4">
          <div className="flex items-center space-x-10">
            <Link href={returnUrl}>Discard</Link>
          </div>
          <button formAction={create}>
            <span>Save</span>
          </button>
        </div>
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
