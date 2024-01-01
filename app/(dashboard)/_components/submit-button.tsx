'use client'
import { useFormStatus } from 'react-dom'

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

/**
 * Submit button that calls `useFormStatus` to show pending state when
 * a server action is being submitted
 */
export const SubmitButton2 = ({
	className,
	children
}: {
	className?: string
	children: React.ReactNode
}) => {
	const { pending } = useFormStatus()
	return (
		<Button
			className={className}
			disabled={pending}
			aria-disabled={pending}
			type="submit"
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
				</>
			) : (
				children
			)}
		</Button>
	)
}
