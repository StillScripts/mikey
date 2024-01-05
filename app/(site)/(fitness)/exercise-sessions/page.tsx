import { notFound } from 'next/navigation'

import { getServerAuthSession } from '@/app/(server)/auth'
import { getExerciseSessions } from '@/app/(server)/routers/exercises'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { H2 } from '@/components/ui/typography'

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
											<Button type="button">Delete</Button>
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
