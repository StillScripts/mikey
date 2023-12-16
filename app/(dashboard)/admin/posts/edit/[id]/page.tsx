import { getPost } from '@/app/(server)/routers/posts'

export const dynamic = 'force-dynamic'

const EditPost = async ({ params }: { params: { id: string } }) => {
  const posts = await getPost(parseInt(params.id))
  const post = posts ? posts[0] : null

  return (
    <div>
      {post?.title}
      {/* <NewPostForm id={params.id} /> */}
    </div>
  )
}

export default EditPost
