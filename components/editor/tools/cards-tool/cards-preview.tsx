import { CardsSection } from './cards-section'
import { useCards } from './cards-tool'

export const CardsPreview = () => {
	const data = useCards()
	return <CardsSection {...data} />
}
