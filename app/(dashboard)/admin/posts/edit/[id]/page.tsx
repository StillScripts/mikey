import { notFound } from 'next/navigation'

import { getBlocks } from '@/app/(server)/routers/blocks'
import { getPost } from '@/app/(server)/routers/posts'
import { type EditorType, SettingsProvider } from '@/components/providers'

import { EditPostForm as EditPostEditorJs } from './editor-js-form'
import { EditPostForm } from './form'

type Params = {
	params: { id: string }
	searchParams: { [key: string]: string | undefined }
}

const EditPost = async ({ params, searchParams }: Params) => {
	const post = await getPost(params.id)
	const starters = await getBlocks()

	const editor: EditorType =
		searchParams?.editor === 'editor-js' ? 'editor-js' : 'custom'

	return (
		<SettingsProvider editor={editor}>
			{editor === 'editor-js' ? (
				<EditPostEditorJs post={post} />
			) : (
				<EditPostForm post={post} starters={starters} />
			)}
		</SettingsProvider>
	)
}

export default EditPost
