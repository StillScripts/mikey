import { NewPostForm } from '@/app/admin/new/form'
import { checkIfPostExists } from '@/app/api/posts'

export const dynamic = 'force-dynamic'

const NewPost = async ({ params }: { params: { id: string } }) => {
  const postExists = await checkIfPostExists(params.id)
  if (postExists) {
    throw new Error('A post with this id already exists')
  }

  return (
    <div>
      <NewPostForm id={params.id} />
    </div>
  )
}

export default NewPost
