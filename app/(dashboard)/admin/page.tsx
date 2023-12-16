'use client'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const AdminHome = () => {
  const router = useRouter()

  const createNewPost = () => {
    const id = uuidv4()
    router.push(`/admin/new/post/${id}`)
  }

  return (
    <div className="p-16">
      <button className="bg-black text-white p-3" onClick={createNewPost}>
        Create New Post
      </button>
    </div>
  )
}

export default AdminHome
