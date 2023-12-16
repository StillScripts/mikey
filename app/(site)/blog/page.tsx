import { db } from '@/db/connection'
import { posts } from '@/db/schema'

const PostsPage = async () => {
  const allPosts = await db.select().from(posts)
  return (
    <div>
      <h1>Posts</h1>
      {allPosts?.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  )
}

export default PostsPage
