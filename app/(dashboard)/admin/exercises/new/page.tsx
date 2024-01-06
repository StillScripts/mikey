import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { FormContainer } from '@/app/(dashboard)/_components/form-container'
import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { getServerAuthSession } from '@/app/(server)/auth'

import { ExerciseForm } from './form'

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
				heading="Add New Exercise"
				links={[
					{ title: 'Exercises', href: '/admin/exercises' },
					{ title: 'New Exercise', href: '/admin/exercises/new' }
				]}
			/>
			<FormContainer>
				<ExerciseForm userId={session.user.id} />
			</FormContainer>
		</div>
	)
}

export default NewExercise
