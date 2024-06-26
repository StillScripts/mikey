/* eslint-disable @next/next/no-img-element */

import { SidebarNavigation } from './sidebar-navigation'

export const DesktopSidebar = () => {
	return (
		<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
			<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-muted px-6 pb-4">
				<div className="flex h-16 shrink-0 items-center">Editor</div>
				<SidebarNavigation />
			</div>
		</div>
	)
}
