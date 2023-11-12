'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'

import '@/app/editor.css'

export const Editor = () => {
  const ref = useRef<EditorJS>()
  const [isMounted, setIsMounted] = useState(false)
  const [blocksJSON, setBlocksJSON] = useState('')

  const saveBlocks = async () => {
    if (ref.current) {
      const blocks = await ref.current?.save()
      setBlocksJSON(JSON.stringify(blocks))
    }
  }

  const initializeEditor = useCallback(async () => {
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
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
    <>
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
    </>
  )
}
