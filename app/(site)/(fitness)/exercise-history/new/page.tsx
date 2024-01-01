import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { H2 } from '@/components/ui/typography'

const ExerciseSessionForm = () => {
	return (
		<div className="space-y-4 md:space-y-6">
			<H2>Record Exercise</H2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
				<div className="space-y-2">
					<Label htmlFor="exercise-name">Exercise Name</Label>
					<Input id="exercise-name" placeholder="Squats" required />
				</div>
				<div className="space-y-2">
					<Label htmlFor="sets">Sets</Label>
					<Input id="sets" placeholder="3" required type="number" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="reps">Reps</Label>
					<Input id="reps" placeholder="10" required type="number" />
				</div>
			</div>
			<Button className="w-full md:w-auto" type="submit">
				Submit
			</Button>
		</div>
	)
}

export default ExerciseSessionForm
