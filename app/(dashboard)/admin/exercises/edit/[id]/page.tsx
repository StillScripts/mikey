import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ExerciseForm } from '@/app/(dashboard)/_components/forms/exercise-form'
import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { getServerAuthSession } from '@/app/(server)/auth'
import { getExercise } from '@/app/(server)/routers/exercises'
import { Button } from '@/components/ui/button'

type Params = {
	params: { id: string }
}

const EditExercisePage = async ({ params }: Params) => {
	const session = await getServerAuthSession()
	const userId = session?.user?.id
	if (!userId) {
		notFound()
	}
	const id = params.id
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
						// @ts-expect-error
						href: `/admin/exercises/edit/${exercise.id}`
					}
				]}
			>
				<Button variant="outline" asChild>
					<Link href="/admin/exercises">Back</Link>
				</Button>
			</PageHeading>
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
