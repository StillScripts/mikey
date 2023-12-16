import { connection } from './connection.js'

// First connect to the database locally
connection.connect((err) => {
  if (err) {
    console.error('An error occured when connecting to MySQL: ', err)
    return
  }
  console.log('Successfully connected to MySQL on localhost')

  // Then create the "mikey_db" table
  connection.query('CREATE DATABASE IF NOT EXISTS mikey_db', (err) => {
    if (err) {
      console.error('Error creating "mikey_db": ', err)
    } else {
      console.log('Successfully created "mikey_db"')
    }
  })

  // Now we can use the "mikey_db" database
  connection.query('USE mikey_db', (err) => {
    if (err) {
      console.error('Error switching to database:', err)
    } else {
      console.log('Successfully using database "mikey_db"')
    }
  })
  // Create the "Post" table first
  connection.query(
    `CREATE TABLE IF NOT EXISTS posts (
      id VARCHAR(36) PRIMARY KEY UNIQUE,
      title VARCHAR(255),
      slug VARCHAR(255),
      content JSON,
      draft_content JSON,
      meta_title VARCHAR(255),
      description TEXT,
      published BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp
    );`,
    (err) => {
      if (err) {
        console.error('Error creating Post table:', err)
      } else {
        console.log('Successfully created "Post" Table')
      }
    }
  )

  // Create an index for the slugs field
  // connection.query(
  //   `CREATE INDEX IF NOT EXISTS idx_slug ON Post (slug);`,
  //   (err) => {
  //     if (err) {
  //       console.error('Error creating INDEX on Posts table:', err)
  //     } else {
  //       console.log('Successfully created INDEX on Posts Table')
  //     }
  //   }
  // )

  // Close the database connection
  connection.end()
})
