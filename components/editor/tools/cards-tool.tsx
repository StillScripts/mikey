'use client'
import React from 'react'
import { createRoot } from 'react-dom/client'

import type {
	API,
	BlockTool,
	BlockToolConstructorOptions
} from '@editorjs/editorjs'

interface CustomBlockData {
	blockId: number
}

const Cards = ({ data, toolInfo, onDataChange }: any) => {
	return (
		<div className="bg-light my-3 rounded border p-3 shadow-sm">
			This will be the cards tool
		</div>
	)
}

export class CardsTool implements BlockTool {
	private data: Partial<CustomBlockData>
	private nodes: { holder: HTMLElement | null }
	private api: API
	private config: any

	constructor({
		data,
		api,
		config
	}: BlockToolConstructorOptions<CustomBlockData>) {
		this.api = api
		this.config = config

		const defaultData = {}

		this.data = Object.keys(data).length ? data : defaultData

		this.nodes = {
			holder: null
		}
	}

	static get toolbox() {
		return {
			title: 'Cards',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
		</svg>`
		}
	}

	render() {
		const rootNode = document.createElement('div')
		this.nodes.holder = rootNode

		const onDataChange = (newData: Partial<CustomBlockData>) => {
			this.data = {
				...this.data,
				...newData
			}
		}

		const root = createRoot(rootNode)
		root.render(<Cards onDataChange={onDataChange} data={this.data} />)

		return this.nodes.holder
	}

	save() {
		return this.data
	}
}
