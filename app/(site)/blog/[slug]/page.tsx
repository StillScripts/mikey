import { notFound } from 'next/navigation'

import { getPostBySlug } from '@/app/(server)/routers/posts'
import { BlockRenderer } from '@/components/editor/block-renderer'

const BlogArticle = async ({ params }: { params: { slug: string } }) => {
	const posts = await getPostBySlug(params.slug)
	const post = posts ? posts[0] : null
	if (!post) {
		notFound()
	}

	const content = post?.content ?? post.draftContent

	return (
		<div>
			<BlockRenderer content={content as string} />
		</div>
	)
}

export default BlogArticle
