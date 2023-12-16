'use client'

import { useFormState } from 'react-dom'
import Link from 'next/link'
import { createPost } from '@/app/api/posts'
import { Editor } from './editor'

export const NewPostForm = ({ id }: { id: string }) => {
  const [state, create] = useFormState(createPost, { id })
  console.log(state)

  return (
    <form>
      <div className="grid w-full gap-10">
        {/** Edit header */}
        <div className="flex w-full items-center justify-end space-x-4">
          <div className="flex items-center space-x-10">
            <Link href="/admin">Discard</Link>
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
