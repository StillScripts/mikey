import { PageHeading } from '@/app/(dashboard)/_components/page-heading'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const SettingsPage = () => {
	return (
		<div>
			<PageHeading heading="Settings" links={[{ title: 'Settings' }]}>
				<ThemeToggle />
			</PageHeading>
		</div>
	)
}

export default SettingsPage
