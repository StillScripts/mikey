import { db, connection2 } from './connection.mts'
import { posts } from './schema.mts'

await db.insert(posts).values({
  // @ts-ignore
  id: '3232332',
  title: 'About Us',
  description: '',
  metaTitle: 'Learn more about us',
  slug: 'about-us'
})

await connection2.end().then(() => {
  console.log('Seed finished and db closed')
})
