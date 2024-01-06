import type { Metadata } from 'next'

import { PageHeading } from '@/app/(dashboard)/_components/page-heading'

export const metadata: Metadata = {
	title: 'Create New Exercise'
}

const NewExercise = async () => {
	return (
		<div>
			<PageHeading
				heading="Add New Exercise"
				links={[
					{ title: 'Exercises', href: '/admin/exercises' },
					{ title: 'New Exercise', href: '/admin/exercises/new' }
				]}
			/>
		</div>
	)
}

export default NewExercise
