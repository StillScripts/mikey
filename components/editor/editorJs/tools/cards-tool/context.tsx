'use client'
import { createContext, useContext, useMemo, useState } from 'react'

import { CardsSection } from '@/components/ui/cards-section'

import type { CardsToolData } from './form'

export const useInitialValue = ({ data }: { data: Partial<CardsToolData> }) => {
	const [cardsData, setCardsData] = useState(data)
	return useMemo(
		() => ({
			cardsData,
			setCardsData
		}),
		[cardsData]
	)
}

type Context = ReturnType<typeof useInitialValue>

export const CardsContext = createContext<Context | undefined>(undefined)

export const CardsProvider = ({
	data,
	children
}: {
	data: Partial<CardsToolData>
	children: React.ReactNode
}) => {
	const value = useInitialValue({ data })
	return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

export const useCards = () => {
	const cards = useContext(CardsContext)
	if (typeof cards === 'undefined') {
		throw new Error('Missing CardsProvider')
	}
	return cards
}

export const CardsPreview = () => {
	const { cardsData } = useCards()
	return <CardsSection {...cardsData} />
}
