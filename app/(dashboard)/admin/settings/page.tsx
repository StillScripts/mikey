import { PageHeading } from '@/app/(dashboard)/_components/page-heading'

const SettingsPage = () => {
	return (
		<div>
			<PageHeading
				heading="Settings"
				links={[{ title: 'Settings', href: '/admin/settings' }]}
			></PageHeading>
		</div>
	)
}

export default SettingsPage
