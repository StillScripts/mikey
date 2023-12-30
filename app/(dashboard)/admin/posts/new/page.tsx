import type { Metadata } from 'next'

import { getBlocks } from '@/app/(server)/routers/blocks'

import { NewPostForm } from './form'

type Params = {
	searchParams: { [key: string]: string | undefined }
}

export const metadata: Metadata = {
	title: 'Create New Post'
}

const NewPost = async ({ searchParams }: Params) => {
	const starters = await getBlocks()
	// if (searchParams?.editor === 'editor-js') {
	// 	return <EditPostEditorJs post={post} />
	// }
	return <NewPostForm starters={starters} />
}

export default NewPost
