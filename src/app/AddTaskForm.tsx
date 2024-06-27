'use client'
import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTask } from './actions';

type Props = {
  listId: number
}

function AddTaskForm({ listId }: Props) {

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    await addTask(name, listId)
    window.location.reload()
  }

  return (
    <form onSubmit={onSubmit} className='flex gap-2'>
      <Input type='text' name='name' placeholder='What do you need to do?'/>
      <Button type='submit'>Add</Button>
    </form>
  )
}

export default AddTaskForm