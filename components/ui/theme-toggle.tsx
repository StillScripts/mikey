'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()
	const [_, startTransition] = React.useTransition()

	return (
		<Button
			suppressHydrationWarning
			variant="ghost"
			size="icon"
			onClick={() => {
				startTransition(() => {
					setTheme(theme === 'light' ? 'dark' : 'light')
				})
			}}
		>
			{!theme ? null : theme === 'dark' ? (
				<MoonIcon className="transition-all" />
			) : (
				<SunIcon className="transition-all" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
