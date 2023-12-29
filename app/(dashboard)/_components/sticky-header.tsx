import {
	AvatarIcon,
	HamburgerMenuIcon,
	MagnifyingGlassIcon
} from '@radix-ui/react-icons'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'

import { SidebarNavigation } from './sidebar-navigation'

export const StickyHeader = () => {
	return (
		<div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl">
			<div className="flex h-16 items-center gap-x-4 border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 shadow-sm backdrop-blur-xl sm:gap-x-6 sm:px-6 lg:px-8 lg:shadow-none">
				<Sheet>
					<SheetTrigger className="-m-2.5 p-2.5 lg:hidden">
						<span className="sr-only">Open sidebar</span>
						<HamburgerMenuIcon
							className="h-6 w-6 text-muted-foreground"
							aria-hidden="true"
						/>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle>Manage Your Website</SheetTitle>
						</SheetHeader>
						<div className="overflow-y-scroll py-6">
							<SidebarNavigation />
						</div>
					</SheetContent>
				</Sheet>

				{/* Separator */}
				<div className="h-6 w-px bg-muted lg:hidden" aria-hidden="true" />

				<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
					{/** Unused search input */}
					<form className="relative flex flex-1" action="#" method="GET">
						<label htmlFor="search-field" className="sr-only">
							Search
						</label>
						<MagnifyingGlassIcon
							className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground"
							aria-hidden="true"
						/>
						<input
							id="search-field"
							className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
							placeholder="Chat..."
							type="search"
							name="search"
						/>
					</form>
					<div className="flex items-center gap-x-4 lg:gap-x-6">
						{/* Profile dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger>
								<AvatarIcon
									className="h-6 w-6 text-muted-foreground"
									aria-hidden="true"
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Billing</DropdownMenuItem>
								<DropdownMenuItem>Team</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>
	)
}
