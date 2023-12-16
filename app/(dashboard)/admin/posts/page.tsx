import { getAllPosts } from '@/app/(server)/routers/posts'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { Metadata } from 'next'
import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Your Posts',
  description: 'View all your posts'
}

const Posts = async () => {
  const allPosts = await getAllPosts()
  return (
    <div className="bg-background p-6">
      <PageHeading
        heading="Blog Posts"
        links={[{ title: 'Posts', href: '/admin/posts' }]}
      >
        <Button type="button" asChild>
          <Link href="/admin/posts/new">New Post</Link>
        </Button>
      </PageHeading>
      <h1 className="text-xl font-bold mb-6">Posts</h1>
      <Table>
        <TableCaption>A list of your posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPosts.map(({ id, title, slug }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>{slug}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Posts
