import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export interface ActionProps {
	action?: (payload: FormData) => void
}

interface SubmitButtonProps extends ActionProps {
	pending?: boolean
}

export const SubmitButton = ({ pending, action }: SubmitButtonProps) => {
	return (
		<Button
			disabled={pending}
			aria-disabled={pending}
			formAction={action ?? undefined}
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
				</>
			) : (
				'Save Changes'
			)}
		</Button>
	)
}
