import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllPosts } from '@/app/(server)/routers/posts'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from '@/components/ui/section'

export const metadata: Metadata = {
	title: 'Blog Articles'
}

const PostsPage = async () => {
	const allPosts = await getAllPosts()
	return (
		<Section>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Our Posts
				</h2>
			</div>
			<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				{allPosts.map(({ id, title, slug }) => (
					<article key={id}>
						<Card>
							<CardHeader>
								<CardTitle>{title}</CardTitle>
							</CardHeader>
							<CardFooter>
								<Button key={id} variant="link" asChild>
									<Link href={`/blog/${slug}`}>Read More</Link>
								</Button>
							</CardFooter>
						</Card>
					</article>
				))}
			</div>
		</Section>
	)
}

export default PostsPage
