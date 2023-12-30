import type { Metadata } from 'next'

import { getBlocksByType } from '@/app/(server)/routers/blocks'

import { NewPostForm } from './form'

export const metadata: Metadata = {
	title: 'Create New Post'
}

const NewPost = async () => {
	const starters = await getBlocksByType('cards')
	return <NewPostForm starters={starters} />
}

export default NewPost
