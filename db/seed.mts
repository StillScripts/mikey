import { db, connection } from './scripts-connection.mts'
import { posts } from './scripts-schema.mts'

// @ts-ignore
await db.insert(posts).values({
	// @ts-ignore
	id: '3232332',
	title: 'About Us',
	description: '',
	metaTitle: 'Learn more about us',
	slug: 'about-us'
})

await connection.end().then(() => {
	console.log('Seed finished and db closed')
})
