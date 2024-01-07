import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getServerAuthSession } from '@/app/(server)/auth'
import { ExerciseSessionForm } from '@/app/(site)/(fitness)/_components/exercise-session-form'
import { H2 } from '@/components/ui/typography'

export const metadata: Metadata = {
	title: 'New Exercise Session',
	description: 'Record a new exercise session'
}

const NewExerciseSession = async () => {
	const session = await getServerAuthSession()
	if (!session?.user?.id) {
		notFound()
	}
	return (
		<div className="space-y-4 md:space-y-6">
			<H2>Exercise Session</H2>
			<p>Logged in as {session.user?.email}</p>
			<ExerciseSessionForm userId={session.user.id} />
		</div>
	)
}

export default NewExerciseSession
