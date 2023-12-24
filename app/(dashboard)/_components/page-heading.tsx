import { type BreadcrubLink, Breadcrumbs } from './breadcrumbs'

export const PageHeading = ({
	heading,
	links,
	children
}: {
	heading: string
	links?: BreadcrubLink[]
	children?: React.ReactNode
}) => {
	return (
		<div className="pb-8">
			<Breadcrumbs links={links} />
			<div className="mt-2 md:flex md:items-center md:justify-between">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
						{heading}
					</h2>
				</div>
				<div className="mt-4 flex flex-shrink-0 space-x-3 md:ml-4 md:mt-0">
					{children}
				</div>
			</div>
		</div>
	)
}
