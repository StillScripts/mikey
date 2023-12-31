import type { Metadata } from 'next'

import { getBlocks } from '@/app/(server)/routers/blocks'
import { type EditorType, SettingsProvider } from '@/components/providers'

import { NewPostFormEditorJs } from './editor-js-form'
import { NewPostForm } from './form'

type Params = {
	searchParams: { [key: string]: string | undefined }
}

export const metadata: Metadata = {
	title: 'Create New Post'
}

const NewPost = async ({ searchParams }: Params) => {
	const starters = await getBlocks()
	const editor: EditorType =
		searchParams?.editor === 'editor-js' ? 'editor-js' : 'custom'

	return (
		<SettingsProvider editor={editor}>
			{editor === 'editor-js' ? (
				<NewPostFormEditorJs starters={starters} />
			) : (
				<NewPostForm starters={starters} />
			)}
		</SettingsProvider>
	)
}

export default NewPost
