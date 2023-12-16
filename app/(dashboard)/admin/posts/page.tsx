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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger
// } from '@/components/ui/alert-dialog'
import { DeletePostMenuItem } from './new/buttons'

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
            <TableHead>Published</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPosts.map(({ id, title, published, slug }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>{slug}</TableCell>
              <TableCell>{published ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                      <DotsHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DeletePostMenuItem id={id} />
                    {/* <DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger>Delete</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will delete this review.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                            //onClick={async () => await deletePost(id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Posts
