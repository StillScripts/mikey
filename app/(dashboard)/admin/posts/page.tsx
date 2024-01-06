import type { Metadata } from 'next'
import Link from 'next/link'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { getAllPosts } from '@/app/(server)/routers/posts'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { DeletePostMenuItem } from './buttons'

export const metadata: Metadata = {
	title: 'Your Posts',
	description: 'View all your posts'
}

const Posts = async () => {
	const allPosts = await getAllPosts()
	return (
		<>
			<PageHeading
				heading="Blog Posts"
				links={[{ title: 'Posts', href: '/admin/posts' }]}
			>
				<Button type="button" asChild>
					<Link href="/admin/posts/new">New Post</Link>
				</Button>
			</PageHeading>
			<h1 className="mb-6 text-xl font-bold">Posts</h1>
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
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
										>
											<DotsHorizontalIcon className="h-4 w-4" />
											<span className="sr-only">Open menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-[160px]">
										<DropdownMenuItem asChild>
											<Link href={`/blog/${slug}`}>View</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href={`/admin/posts/edit/${id}`}>Edit</Link>
										</DropdownMenuItem>
										<DeletePostMenuItem id={id} />
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default Posts
