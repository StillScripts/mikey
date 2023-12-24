import { z } from 'zod'

const sample = {
	time: 1703384217818,
	blocks: [
		{
			id: 'Mald2whe4I',
			type: 'paragraph',
			data: { text: 'Yet another post to test' }
		},
		{
			id: 'oXBm0Y9Oc1',
			type: 'paragraph',
			data: {
				text: 'Woah, this post has been updated! You can be a little old for a lot of things..This'
			}
		},
		{
			id: 'rFbDnUxCKR',
			type: 'cards',
			data: {
				cards: [
					{
						title: 'The first card is cool',
						description: 'This card is super useful'
					},
					{
						title: 'This is another card',
						description: 'I am super happy about this card!'
					}
				],
				heading: 'This is a cards section',
				subheading: 'Wow, have a look at this. It is pretty amazing bro.'
			}
		}
	],
	version: '2.28.2'
}

const editorSchema = z.object({
	// timestamp
	time: z.number(),
	// version of app
	version: z.string(),
	blocks: z.array(
		z.object({
			id: z.string(),
			type: z.enum(['header', 'paragraph', 'link', 'list', 'cards']),
			// text
			text: z.string().optional(),
			level: z.number().optional(),
			// list
			style: z.enum(['ordered', 'unordered']).optional(),
			items: z.array(z.string()).optional(),
			// link
			link: z.string().optional(),
			meta: z.object({
				title: z.string()
			}),
			// cards
			heading: z.string().min(2).max(200).optional(),
			subheading: z.string().min(2).max(1000).optional(),
			cards: z
				.array(
					z.object({
						title: z.string().min(1, { message: 'Required field' }),
						description: z.string().min(1, { message: 'Required field' })
					})
				)
				.optional()
		})
	)
})
