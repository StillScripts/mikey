import type { Metadata } from 'next'

import { getBlocks } from '@/app/(server)/routers/blocks'

import { NewPostForm } from './form'

export const metadata: Metadata = {
	title: 'Create New Post'
}

const NewPost = async () => {
	const starters = await getBlocks()
	return <NewPostForm starters={starters} />
}

export default NewPost
