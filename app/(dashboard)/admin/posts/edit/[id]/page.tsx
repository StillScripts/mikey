import { getPost } from '@/app/(server)/routers/posts'
import { EditPostForm } from './form'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const EditPost = async ({ params }: { params: { id: string } }) => {
  const posts = await getPost(parseInt(params.id))
  const post = posts ? posts[0] : null
  if (!post) {
    notFound()
  }

  return <EditPostForm post={post} />
}

export default EditPost
