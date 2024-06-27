'use client'
import { Button } from '@/components/ui/button'
import { Task } from '@/models/task'
import React, { useState } from 'react'
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { setTaskState } from './actions';

type Props = {
  task: Task
}

function TaskRow({ task }: Props) {
  const [isDone, setIsDone] = useState(task.is_done)

  async function onCheckClicked() {
    await setTaskState(task.id, !isDone)
    setIsDone(!isDone)
  }

  return (
    <div key={task.id} className={`flex items-center transition-all ${isDone ? 'text-slate-500' : ''}`}>
      <Button variant='link' className='text-lg text-inherit' onClick={onCheckClicked}>
        {isDone ? <FiCheckCircle /> : <FiCircle /> }
      </Button>
      <div className={`${isDone && 'line-through'}`}>{task.name}</div>
    </div>
  )
}

export default TaskRow