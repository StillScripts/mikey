import React from 'react'

import { Breadcrumbs } from '@/app/(dashboard)/_components/breadcrumbs'

import { NewPostButtons } from '../buttons'

export const NewPostHeading = ({
	children,
	action
}: {
	children: React.ReactNode
	action?: (payload: FormData) => void
}) => {
	return (
		<div className="pb-8">
			<Breadcrumbs
				links={[
					{ title: 'Posts', href: '/admin/posts' },
					{ title: 'New Post', href: '/admin/posts/new' }
				]}
			/>
			<div className="mt-2 md:flex md:items-center md:justify-between">
				<div className="min-w-0 flex-1">{children}</div>
				<div className="mt-4 flex flex-shrink-0 space-x-3 md:ml-4 md:mt-0">
					<NewPostButtons />
				</div>
			</div>
		</div>
	)
}
