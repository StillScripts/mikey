import type { Route } from 'next'
import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export interface BreadcrubLink {
	title: string
	href?: Route
}

export const Breadcrumbs = ({ links }: { links?: BreadcrubLink[] }) => {
	return (
		<div>
			<nav className="sm:hidden" aria-label="Back">
				<a
					href="/admin"
					className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
				>
					<ChevronLeft
						className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-muted-foreground"
						aria-hidden="true"
					/>
					Back
				</a>
			</nav>
			<nav className="hidden sm:flex" aria-label="Breadcrumb">
				<ol role="list" className="flex items-center space-x-4">
					<li>
						<div className="flex">
							<Button variant="link" asChild>
								<Link href="/admin">Admin</Link>
							</Button>
						</div>
					</li>
					{links?.map(link => (
						<li key={link.title}>
							<div className="flex items-center">
								<ChevronRight
									className="h-5 w-5 flex-shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
								{link?.href ? (
									<Button className="ml-4" variant="link" asChild>
										<Link href={link.href}>{link.title}</Link>
									</Button>
								) : (
									<Button className="ml-4" variant="link" disabled>
										{link.title}
									</Button>
								)}
							</div>
						</li>
					))}
				</ol>
			</nav>
		</div>
	)
}
