import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllPosts } from '@/app/(server)/routers/posts'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
	title: 'Blog Articles'
}

const PostsPage = async () => {
	const allPosts = await getAllPosts()
	return (
		<div className="bg-background py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						From the blog
					</h2>
					<p className="mt-2 text-lg leading-8 text-muted-foreground">
						Learn how to grow your business with our expert advice.
					</p>
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
			</div>
		</div>
	)
}

export default PostsPage
