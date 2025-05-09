'use client';
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

function Navbar() {

  const [isExpanded, setIsExpanded] = React.useState(false);
  const toggleAddButton = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Image src="/Genesis-logo.png" alt="genesis-logo" width={65} height={65} />
        <h4 className="navbar-title">Genesis</h4>
      </div>
      <div className="navbar-center">
        <button className="add-button" onClick={toggleAddButton}>
          <Image src="/add-button.png" alt="add-button" width={40} height={40} />
        </button>
        {isExpanded && (
          <div className="dropdown-menu">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          </div>
        )}
      </div>
      <div className="navbar-right">
        <h4 className="navbar-user">Hi, User</h4>
        <Image src="/profile-pic.jpg" alt="profile-pic" width={50} height={50} className="profile-pic" />
      </div>
    </nav>
  )
}

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })


  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div>
      <Navbar />
      {/* <h1 className="titles">Payload To Do App</h1>
      <h4 className="titles">User Email: {user?.email}</h4>
      <div className="todos">
        <h2>To Dos:</h2>
        {todos.docs.map((todo) => (
          <Link href={`/todos/${todo.id}`} key={todo.id} style={{ textDecoration: 'none' }}>
            <div className="todos">
              <h3>{todo.title}</h3>
              <p>{todo.id}</p>
              <p>{todo.description}</p>
              <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
              <p>{todo.createdAt}</p>
              <p>{todo.updatedAt}</p>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  )
}
