'use client'
import { deleteExercise } from '@/app/(server)/routers/exercises'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export const DeleteExerciseMenuItem = ({ id }: { id: string }) => {
	return (
		<DropdownMenuItem>
			<button onClick={async () => await deleteExercise(id)}>Delete</button>
		</DropdownMenuItem>
	)
}
