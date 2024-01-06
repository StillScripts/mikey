import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ExerciseForm } from '@/app/(dashboard)/_components/forms/exercise-form'
import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { getServerAuthSession } from '@/app/(server)/auth'

export const metadata: Metadata = {
	title: 'Create New Exercise'
}

const NewExercise = async () => {
	const session = await getServerAuthSession()
	if (!session?.user?.id) {
		notFound()
	}
	return (
		<div>
			<PageHeading
				heading="New Exercise"
				links={[
					{ title: 'Exercises', href: '/admin/exercises' },
					{ title: 'New Exercise', href: '/admin/exercises/new' }
				]}
			/>
			<ExerciseForm userId={session.user.id} />
		</div>
	)
}

export default NewExercise
