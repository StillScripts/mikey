import { getAllPosts } from '@/app/(server)/routers/posts'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog Articles'
}

const PostsPage = async () => {
  const allPosts = await getAllPosts()
  return (
    <div>
      <h1>Posts</h1>
      {allPosts?.map(({ id, slug, title }) => (
        <Button key={id} variant="link" asChild>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </Button>
      ))}
    </div>
  )
}

export default PostsPage
