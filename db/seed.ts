import { drizzle } from 'drizzle-orm/mysql2'
import { v4 as uuidv4 } from 'uuid'

import 'dotenv/config'

import { getConnection } from './get-connection'
import { posts } from './schema'

const samplePost = {
	id: uuidv4(),
	title: 'Tesla',
	description: 'Learn about Tesla vehicles',
	slug: 'tesla',
	metaTitle: 'Tesla Vehicles',
	draftContent: JSON.stringify({
		time: 1703972582484,
		blocks: [
			{
				id: 'fcoiRN93dS',
				type: 'header',
				data: {
					text: 'Win a free car',
					level: 2
				}
			},
			{
				id: 'ilnc3vLlRf',
				type: 'paragraph',
				data: {
					text: 'This is a paragraph!'
				}
			}
		],
		version: '2.28.2'
	}),
	published: false
}

const seedScript = async () => {
	const connection = await getConnection()
	const db = drizzle(connection)

	await db.insert(posts).values(samplePost)

	await connection.end().then(() => {
		console.log('Seed finished and db closed')
	})
}

seedScript()
