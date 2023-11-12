'use server'

import { connection } from '@/db/connection'

export const savePost = async (state: any, formData: FormData) => {
  console.log('saving')
  console.log(formData.get('title'))
  console.log(formData.get('blocks'))
  const title = formData.get('title') as string
  const blocks = formData.get('blocks') as string

  if (title && blocks) {
    const slug = title.trim().toLowerCase().replace(/ /g, '-')
    // Now we can use the "mikey_db" database
    connection.query('USE mikey_db', (err) => {
      if (err) {
        console.error('Error switching to database:', err)
      } else {
        console.log('Successfully using database "mikey_db"')
      }
    })

    connection.query(
      `INSERT INTO Post (title, slug, meta_title, draft_content) 
      VALUES ('${title}', '${slug}', '${title}', '${blocks}');
      ;`,
      (err) => {
        if (err) {
          console.error('Error creating Post', err)
        } else {
          console.log('Successfully created new Post')
        }
      }
    )
  }
}

export const publishPost = async (state: any) => {
  console.log('publishing')
}
