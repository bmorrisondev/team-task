'use client'
import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createOrgList, createUserList } from './actions';

type Props = {
  isOrg?: boolean
}

function AddListForm({ isOrg }: Props) {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    if(isOrg) {
      await createOrgList(name)
    } else {
      await createUserList(name)
    }
    window.location.reload()
  }

  return (
    <form onSubmit={onSubmit} className='flex gap-2'>
      <Input type='text' name='name' placeholder='List name'/>
      <Button type='submit'>Add</Button>
    </form>
  )
}

export default AddListForm