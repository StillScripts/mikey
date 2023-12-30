import { Breadcrumbs } from '@/app/(dashboard)/_components/breadcrumbs'
import type { SinglePost } from '@/app/(server)/routers/posts'
import type { ActionStatus } from '@/lib/utils'

import { EditPostButtons } from '../buttons'

export const EditPageHeading = ({
	state,
	action,
	children
}: {
	state: ActionStatus & Partial<SinglePost>
	action?: (payload: FormData) => void
	children: React.ReactNode
}) => {
	return (
		<div className="pb-8">
			<Breadcrumbs
				links={[
					{ title: 'Posts', href: '/admin/posts' },
					// @ts-expect-error this is a valid route
					{ title: 'Edit Post', href: `/admin/posts/edit/${state?.id}` }
				]}
			/>
			<div className="mt-2 md:flex md:items-center md:justify-between">
				<div className="min-w-0 flex-1">{children}</div>
				<div className="mt-4 flex flex-shrink-0 space-x-3 md:ml-4 md:mt-0">
					{state?.id && (
						<EditPostButtons action={action} id={state.id} slug={state.slug!} />
					)}
				</div>
			</div>
		</div>
	)
}
