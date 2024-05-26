import * as React from 'react'

import { cn } from '@/lib/utils'

export const H2 = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	return (
		<h2
			ref={ref}
			className={cn(
				'text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight',
				className
			)}
			{...props}
		>
			{children}
		</h2>
	)
})
H2.displayName = 'H2'
