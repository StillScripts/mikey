'use client'

import * as React from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import EditorJS from '@editorjs/editorjs'
import { createPost, publishPost } from '@/app/api/posts'
import '@/app/editor.css'

const initialState = {}

export const Editor = ({ id }: { id: string }) => {
  const ref = React.useRef<EditorJS>()
  const [state, create] = useFormState(createPost, { id })
  const [state2, publish] = useFormState(publishPost, initialState)
  const [isMounted, setIsMounted] = React.useState(false)
  const [blocksJSON, setBlocksJSON] = React.useState('')

  const saveBlocks = async () => {
    if (ref.current) {
      const blocks = await ref.current?.save()
      setBlocksJSON(JSON.stringify(blocks))
    }
  }

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    // @ts-ignore
    const Header = (await import('@editorjs/header')).default
    // @ts-ignore
    const Paragraph = (await import('@editorjs/paragraph')).default
    // @ts-ignore
    const List = (await import('@editorjs/list')).default
    // @ts-ignore
    const LinkTool = (await import('@editorjs/link')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        onChange() {
          saveBlocks()
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        tools: {
          header: Header,
          paragraph: Paragraph,
          linkTool: LinkTool,
          list: List
        }
      })
    }
  }, [])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  if (!isMounted) {
    return null
  }

  return (
    <form>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-end space-x-4">
          <div className="flex items-center space-x-10">
            <Link href="/admin">Discard</Link>
          </div>
          <button formAction={create}>
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <textarea
            autoFocus
            id="title"
            placeholder="Post title"
            name="title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{' '}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
          <textarea
            className="hidden w-full resize-none appearance-none overflow-hidden bg-transparent focus:outline-none"
            id="blocks"
            name="blocks"
            value={blocksJSON}
          />
          <input className="hidden" disabled id="id" name="id" value={id} />
        </div>
      </div>
    </form>
  )
}
