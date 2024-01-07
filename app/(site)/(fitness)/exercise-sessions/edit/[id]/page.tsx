import { notFound } from 'next/navigation'

import { getServerAuthSession } from '@/app/(server)/auth'
import { getExerciseSession } from '@/app/(server)/routers/exercises'
import { ExerciseSessionForm } from '@/app/(site)/(fitness)/_components/exercise-session-form'
import { H2 } from '@/components/ui/typography'

export const dynamic = 'force-dynamic'

type Params = {
	params: { id: string }
}

const EditExerciseSession = async ({ params }: Params) => {
	const session = await getServerAuthSession()
	if (!session?.user?.id) {
		notFound()
	}
	const exerciseSession = await getExerciseSession(params.id)

	if (!exerciseSession) {
		notFound()
	}

	return (
		<div className="space-y-4 md:space-y-6">
			<H2>Exercise Session</H2>
			<p>Logged in as {session.user?.email}</p>
			<ExerciseSessionForm
				userId={session.user.id}
				exerciseSession={exerciseSession}
			/>
		</div>
	)
}

export default EditExerciseSession
