import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'

export default async function TodoPage({ params }: { params: { id: string } }) {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const todoId = params.id
    const todo = await payload.findByID({
        collection: 'todos',
        id: todoId,
    })

    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/todos/${todoId}`)
    const todoREST = await response.json();
    
    return (
        <div>
            <Link href='/'>Back to Home page</Link>
            <h1>Todo {todo.title}</h1>
            <p>{todo.id}</p>
            <p>{todo.description}</p>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            <p>{todo.createdAt}</p>
            <p>{todo.updatedAt}</p>
            <pre>{JSON.stringify(todo.media)}</pre>
        </div>
    );

}
