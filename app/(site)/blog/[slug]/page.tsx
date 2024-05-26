import { notFound } from 'next/navigation'

import { getPostBySlug } from '@/app/(server)/routers/posts'
import { BlockRenderer } from '@/components/editor/block-renderer'
import { Section } from '@/components/ui/section'

const BlogArticle = async ({ params }: { params: { slug: string } }) => {
	const post = await getPostBySlug(params.slug)
	if (!post) {
		notFound()
	}

	const content = post?.content ?? post.draftContent

	return (
		<Section>
			<BlockRenderer content={content as string} />
		</Section>
	)
}

export default BlogArticle
