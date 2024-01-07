import { notFound } from 'next/navigation'

import { ExerciseForm } from '@/app/(dashboard)/_components/forms/exercise-form'
import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { getServerAuthSession } from '@/app/(server)/auth'
import { getExercise } from '@/app/(server)/routers/exercises'

type Params = {
	params: { id: string }
}

const EditExercisePage = async ({ params }: Params) => {
	const session = await getServerAuthSession()
	const userId = session?.user?.id
	if (!userId) {
		notFound()
	}
	const id = parseInt(params.id)
	const exercise = await getExercise(id)
	if (exercise?.userId !== userId) {
		notFound()
	}
	return (
		<div>
			<PageHeading
				heading={`Edit ${exercise.title}`}
				links={[
					{ title: 'Exercises', href: '/admin/exercises' },
					{
						title: 'Edit Exercise',
						href: `/admin/exercises/edit/${exercise.id}`
					}
				]}
			/>
			<ExerciseForm
				title="Edit This Exercise"
				description="Update the title or description of this exercise"
				userId={userId}
				exercise={exercise}
			/>
		</div>
	)
}

export default EditExercisePage
