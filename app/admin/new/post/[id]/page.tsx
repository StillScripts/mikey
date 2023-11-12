import { Editor } from '@/app/admin/new/editor'
import { checkIfPostExists } from '@/app/api/posts'

export const dynamic = 'force-dynamic'

const NewPost = async ({ params }: { params: { id: string } }) => {
  const postExists = await checkIfPostExists(params.id)
  if (postExists) {
    throw new Error('A post with this id already exists')
  }

  return (
    <div>
      <Editor id={params.id} />
    </div>
  )
}

export default NewPost
