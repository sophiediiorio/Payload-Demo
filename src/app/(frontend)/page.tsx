import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
})

  return (
    <div>
      <h1 className='titles'>Payload To Do App</h1>
      <h4 className='titles'>User Email: {user?.email}</h4>
      <div className='todos'>
        <h2>To Dos:</h2>
        {todos.docs.map((todo) => (
          <Link href={`/todos/${todo.id}`} key={todo.id} style={{ textDecoration: 'none' }}>
            <div className='todos'>
              <h3>{todo.title}</h3>
              <p>{todo.id}</p>
              <p>{todo.description}</p>
              <p>{todo.completed ? "Completed" : "Not Completed"}</p>
              <p>{todo.createdAt}</p>
              <p>{todo.updatedAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
