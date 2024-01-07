import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getServerAuthSession } from '@/app/(server)/auth'
import { getExerciseSessions } from '@/app/(server)/routers/exercise-sessions'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { H2 } from '@/components/ui/typography'

export const metadata: Metadata = {
	title: 'Exercise Sessions',
	description: 'View your exercise sessions'
}

const ExerciseSessionsPage = async () => {
	const session = await getServerAuthSession()
	if (!session?.user?.id) {
		notFound()
	}
	const exerciseSessions = await getExerciseSessions(session.user.id)
	return (
		<main className="p-4 md:p-6">
			<div className="space-y-6 md:space-y-8">
				<div className="space-y-4 md:space-y-6">
					<H2>Exercise Sessions</H2>
					<div className="rounded-lg border shadow-sm">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="max-w-[150px]">Notes</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{exerciseSessions.map(item => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">{item.notes}</TableCell>
										<TableCell>
											{new Date(item.date).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<Dialog>
												<DialogTrigger asChild>
													<Button type="button">View Details</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>Exercise Session Details</DialogTitle>
														<DialogDescription>
															{item.notes} (
															{new Date(item.date).toLocaleDateString()})
														</DialogDescription>
													</DialogHeader>
													<div className="text-muted-foreground">
														<h5 className="mt-4 font-bold">Sets</h5>
														<ul className="text-muted-foreground">
															{item.exerciseSets.map(set => (
																<li key={set.id}>
																	{set.exerciseTitle} - {set.reps} reps
																</li>
															))}
														</ul>
													</div>
													<DialogFooter>
														<Button asChild>
															<Link href={`/exercise-sessions/edit/${item.id}`}>
																Edit
															</Link>
														</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</main>
	)
}

export default ExerciseSessionsPage
