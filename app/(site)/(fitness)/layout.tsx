export default function FitnessLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<main className="bg-background py-10">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
		</main>
	)
}
