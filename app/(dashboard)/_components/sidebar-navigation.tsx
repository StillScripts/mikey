import { BarChart, Calendar, File, Folder, Home, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
	{ name: 'Dashboard', href: '#', icon: Home, current: true },
	{ name: 'Team', href: '#', icon: User, current: false },
	{ name: 'Projects', href: '#', icon: Folder, current: false },
	{ name: 'Calendar', href: '#', icon: Calendar, current: false },
	{ name: 'Documents', href: '#', icon: File, current: false },
	{ name: 'Reports', href: '#', icon: BarChart, current: false }
]

export const SidebarNavigation = () => {
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
									<a
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
									</a>
								</Button>
							</li>
						))}
					</ul>
				</li>
			</ul>
		</nav>
	)
}
