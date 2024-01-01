import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

export default function ExerciseHistory() {
	return (
		<main className="p-4 md:p-6">
			<div className="space-y-6 md:space-y-8">
				<div className="space-y-4 md:space-y-6">
					<h1 className="text-2xl font-bold md:text-3xl">Record Exercise</h1>
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
				<div className="space-y-4 md:space-y-6">
					<h2 className="text-xl font-bold md:text-2xl">Recorded Exercises</h2>
					<div className="rounded-lg border shadow-sm">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="max-w-[150px]">Exercise Name</TableHead>
									<TableHead>Sets</TableHead>
									<TableHead>Reps</TableHead>
									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium">Squats</TableCell>
									<TableCell>3</TableCell>
									<TableCell>10</TableCell>
									<TableCell>
										<Button type="button">Delete</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</main>
	)
}
