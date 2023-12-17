import Link from 'next/link'

import { Button } from '@/components/ui/button'

import type { Block } from './types'

const ResolveBlock = ({ block }: { block: Block }) => {
	switch (block.type) {
		case 'header':
			const text = block.data?.text ?? ''
			switch (block.data?.level) {
				case 1:
					return <h1>{text}</h1>
				case 2:
					return <h2>{text}</h2>
				case 3:
					return <h3>{text}</h3>
				case 4:
					return <h4>{text}</h4>
				case 5:
					return <h5>{text}</h5>
				case 6:
					return <h6>{text}</h6>
				default:
					return null
			}
		case 'paragraph':
			return <p>{block.data?.text ?? ''}</p>
		case 'list':
			const ListItems = () => (
				<>
					{block.data?.items?.map((item, i) => <li key={item + i}>{item}</li>)}
				</>
			)
			switch (block?.data?.style) {
				case 'ordered':
					return (
						<ol>
							<ListItems />
						</ol>
					)
				case 'unordered':
					return (
						<ul>
							<ListItems />
						</ul>
					)
				default:
					return null
			}
		case 'link':
			if (!block.data?.link || !block.data?.meta?.title) return null
			return (
				<Button variant="link" asChild>
					{/** @ts-expect-error this link can be anything */}
					<Link href={block.data.link}>{block.data?.meta?.title}</Link>
				</Button>
			)
		default:
			return null
	}
}

export const BlockRenderer = ({ content }: { content: string }) => {
	const blocks = JSON.parse(content)?.blocks as Block[]
	return (
		<main className="prose prose-stone p-4 text-muted-foreground prose-headings:text-foreground">
			{blocks?.map(block => <ResolveBlock key={block.id} block={block} />)}
		</main>
	)
}
