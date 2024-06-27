import { OrganizationSwitcher } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiArrowRight, FiArrowRightCircle, FiBook, FiCalendar, FiHome, FiInbox, FiList, FiPlus } from "react-icons/fi"
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import AddListForm from '@/app/AddListForm'
import { getOrgLists, getUserLists } from '@/app/actions'

async function ListsList() {
  const userLists = await getUserLists()
  const orgLists = await getOrgLists()

  console.log(userLists, orgLists)

  return (
    <div className='flex flex-col gap-2 text-sm w-full'>
      <Link href="/" className="flex gap-2 items-center"><FiInbox className="text-slate-700" /> Inbox</Link>
      <hr />
      <div className="font-bold">My lists</div>
      {/* <Link href="/" className="flex gap-2 items-center"><FiArrowRightCircle className="text-slate-700" /> Next actions</Link>
      <Link href="/" className="flex gap-2 items-center"><FiCalendar className="text-slate-700" /> Someday/maybe</Link>
      <Link href="/" className="flex gap-2 items-center"><FiBook className="text-slate-700" /> Reading list</Link> */}
      {userLists.map((list) => (
        <Link  href={`/list/${list.id}`} className="flex gap-2 items-center"><FiList className="text-slate-700" /> {list.name}</Link>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className='gap-1 justify-start text-xs'>
            <FiPlus /> New list
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            Add personal list
          </DialogHeader>
          <AddListForm />
        </DialogContent>
      </Dialog>
      <hr />
      <OrganizationSwitcher hidePersonal />
      {orgLists.map((list) => (
        <Link  href={`/list/${list.id}`} className="flex gap-2 items-center">
          <FiList className="text-slate-700" /> {list.name}
        </Link>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className='gap-1 justify-start text-xs'>
            <FiPlus /> New list
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            Add org list
          </DialogHeader>
          <AddListForm isOrg />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ListsList