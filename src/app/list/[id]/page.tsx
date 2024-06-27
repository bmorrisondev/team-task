import { auth } from "@clerk/nextjs/server";
import AddTaskForm from "@/app/AddTaskForm";
import TaskRow from "@/app/TaskRow";
import { Task } from "@/models/task";
import { getTasks } from "./actions";

export default async function Tasks({ params }: { params: { id: string } }) {
  const { sessionClaims } = auth();
  if(!sessionClaims) throw new Error('No session claims')
  const tasks = await getTasks(Number(params.id)) as Task[]

  return (
    <div className='flex flex-col'>
      <AddTaskForm listId={Number(params.id)} />
      <div className='flex flex-col gap-2 p-2'>
        {tasks.map(task => <TaskRow key={task.id} task={task} />)}
      </div>
    </div>
  );
}
