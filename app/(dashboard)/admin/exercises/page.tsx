import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { getServerAuthSession } from '@/app/(server)/auth'
import { getUserExercises } from '@/app/(server)/routers/exercises'
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

export const metadata: Metadata = {
	title: 'Your Posts',
	description: 'View all your posts'
}

const Posts = async () => {
	const session = await getServerAuthSession()
	if (!session?.user?.id) {
		notFound()
	}
	const exercises = await getUserExercises(session.user.id)
	return (
		<>
			<PageHeading
				heading="Exercises"
				links={[{ title: 'Exercises', href: '/admin/exercises' }]}
			>
				<Button type="button" asChild>
					<Link href="/admin/exercises/new">New Exercise</Link>
				</Button>
			</PageHeading>
			<h1 className="mb-6 text-xl font-bold">Exercises</h1>
			<Table>
				<TableCaption>A list of your posts.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{exercises.map(({ id, title, description }) => (
						<TableRow key={id}>
							<TableCell className="font-medium">{title}</TableCell>
							<TableCell>
								<span className="truncate">{description}</span>
							</TableCell>
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
											<Link href={`/admin/exercises/edit/${id}`}>Edit</Link>
										</DropdownMenuItem>
										{/* <DeletePostMenuItem id={id} /> */}
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
