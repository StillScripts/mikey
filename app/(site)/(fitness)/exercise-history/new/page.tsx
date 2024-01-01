import type { Metadata } from 'next'

import { H2 } from '@/components/ui/typography'

import { ExerciseSessionForm } from './form'

export const metadata: Metadata = {
	title: 'New Exercise Session',
	description: 'Record a new exercise session'
}

const NewExerciseSession = () => {
	return (
		<div className="space-y-4 md:space-y-6">
			<H2>Exercise Session</H2>
			<ExerciseSessionForm />
		</div>
	)
}

export default NewExerciseSession
