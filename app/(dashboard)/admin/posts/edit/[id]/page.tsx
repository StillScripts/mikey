import { notFound } from 'next/navigation'

import { getPost } from '@/app/(server)/routers/posts'

import { EditPostForm as EditPostEditorJs } from './editor-js-form'
import { EditPostForm } from './form'

export const dynamic = 'force-dynamic'

type Params = {
	params: { id: string }
	searchParams: { [key: string]: string | undefined }
}

const EditPost = async ({ params, searchParams }: Params) => {
	const posts = await getPost(parseInt(params.id))
	const post = posts ? posts[0] : null
	if (!post) {
		notFound()
	}

	if (searchParams?.editor === 'editor-js') {
		return <EditPostEditorJs post={post} />
	}

	return <EditPostForm post={post} />
}

export default EditPost
