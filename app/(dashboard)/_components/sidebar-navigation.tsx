'use client'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HomeIcon, Pencil2Icon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const SidebarNavigation = () => {
	const pathname = usePathname()

	const navigation: {
		name: string
		href: Route
		icon: any
		current?: boolean
	}[] = [
		{
			name: 'Dashboard',
			href: '/admin',
			icon: HomeIcon,
			current: pathname === '/admin'
		},
		{
			name: 'Posts',
			href: '/admin/posts',
			icon: Pencil2Icon,
			current: pathname.includes('/admin/post')
		}
	]

	return (
		<nav className="flex flex-1 flex-col">
			<ul role="list" className="flex flex-1 flex-col gap-y-7">
				<li>
					<ul role="list" className="-mx-2 space-y-1">
						{navigation.map(item => (
							<li key={item.name}>
								<Button
									className={cn(
										'w-full justify-start text-left',
										item.current && 'bg-accent'
									)}
									variant="ghost"
									asChild
								>
									<Link
										href={item.href}
										className="group flex w-full items-center justify-start gap-x-3"
									>
										<item.icon
											className={cn(
												item.current
													? 'text-primary'
													: 'text-muted-foreground group-hover:text-primary',
												'h-6 w-6 shrink-0'
											)}
											aria-hidden="true"
										/>
										{item.name}
									</Link>
								</Button>
							</li>
						))}
					</ul>
				</li>
			</ul>
		</nav>
	)
}
