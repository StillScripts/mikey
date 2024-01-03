import { notFound } from 'next/navigation'

import { getExerciseSession } from '@/app/(server)/routers/exercises'

export const dynamic = 'force-dynamic'

type Params = {
	params: { id: string }
}

const EditExerciseSession = async ({ params }: Params) => {
	const exerciseSessions = await getExerciseSession(parseInt(params.id))
	const exerciseSession = exerciseSessions ? exerciseSessions[0] : null
	if (!exerciseSession) {
		notFound()
	}

	return <div>{exerciseSession.notes}</div>
}

export default EditExerciseSession
