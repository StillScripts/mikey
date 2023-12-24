import { CardsToolData } from './tools/cards-tool/form'

export interface EditorjsData {
	time: number
	blocks: Block[]
	version: string
}

export interface Block {
	id: string
	type: BlockType
	data: Partial<Data>
}

export interface Data extends CardsToolData {
	// text
	text: string
	level: 1 | 2 | 3 | 4 | 5 | 6
	// list
	style: 'ordered' | 'unordered'
	items: string[]
	// link
	link: string
	meta: {
		title: string
	}
}

export type BlockType = 'header' | 'paragraph' | 'link' | 'list' | 'cards'
