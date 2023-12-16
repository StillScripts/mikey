import { getAllPosts } from '@/app/(server)/routers/posts'

const PostsPage = async () => {
  const allPosts = await getAllPosts()
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
