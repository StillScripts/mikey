import type { Metadata } from 'next'
import { NewPostForm } from './form'

export const metadata: Metadata = {
  title: 'Create New Post'
}

const NewPost = () => {
  return <NewPostForm />
}

export default NewPost
