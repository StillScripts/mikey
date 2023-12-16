'use server'

import { v4 as uuidv4 } from 'uuid'
import { connection } from '@/db/connection'

const connectionDB = () => {
  connection.query('USE mikey_db', (err) => {
    if (err) {
      console.error('Error switching to database:', err)
    } else {
      console.log('Successfully using database "mikey_db"')
    }
  })
  return connection
}

export const createPost = async (state: any, formData: FormData) => {
  const id = state.id
  const title = formData.get('title') as string
  const blocks = formData.get('blocks') as string

  if (id && title && blocks) {
    const slug = title.trim().toLowerCase().replace(/ /g, '-')
    console.log(`INSERT INTO Post (id, title, slug, meta_title, draft_content)
    VALUES ('${id}', '${title}', '${slug}', '${title}', '${blocks}');
    ;`)
    return new Promise((resolve, reject) => {
      const connection = connectionDB()

      connection.query(
        `INSERT INTO Post (id, title, slug, meta_title, draft_content)
      VALUES ('${id}', '${title}', '${slug}', '${title}', '${blocks}');
      ;`,
        (err) => {
          if (err) {
            reject(err)
          } else {
            console.log('Successfully created new Post')
            resolve({ error: false, success: true })
          }
        }
      )
    })
  }
  return { error: true, success: false }
}

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

    const id = uuidv4()
    connection.query(
      `INSERT INTO Post (id, title, slug, meta_title, draft_content) 
      VALUES ('${id}', '${title}', '${slug}', '${title}', '${blocks}');
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

/** Check if a post already exists with the same id */
export const checkIfPostExists = (id: string) => {
  return new Promise((resolve, reject) => {
    const connection = connectionDB()
    connection.query(
      `SELECT EXISTS (SELECT 1 FROM Post WHERE id = '${id}') AS id_exists;`,
      (err, results) => {
        if (err) {
          console.error('Error checking post exists', err)
          reject(err)
        } else {
          // @ts-ignore
          const idExists = results[0].id_exists === 1
          resolve(idExists)
        }
      }
    )
  })
}
