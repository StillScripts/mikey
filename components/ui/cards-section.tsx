import type { CardsToolData } from '@/components/editor/editorJs/tools/cards-tool/form'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

export const CardsSection = ({
	heading,
	subheading,
	cards
}: Partial<CardsToolData>) => {
	return (
		<div>
			<h3>{heading}</h3>
			<p className="text-muted-foreground">{subheading}</p>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{cards?.map(({ title, description }, index) => (
					<Card key={`card-${index}`}>
						<CardHeader>
							<CardTitle>{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	)
}
