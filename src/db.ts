import { neon } from "@neondatabase/serverless";

// Initialize the neon client with the DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const sql = neon(process.env.DATABASE_URL);

export async function isUserPermittedToCreateOnList(userId: string, orgId: string, listId: number) {
  const listRes = await sql`
    SELECT * FROM lists WHERE id = ${listId} and (owner_id = ${userId} or owner_id = ${orgId})
  `;
  return listRes.length > 0;
}

export async function isUserPermittedToModifyTask(userId: string, orgId: string, taskId: number) {
  const taskRes = await sql`select list_id, created_by_id from tasks where id = ${taskId}` as { list_id: number, created_by_id: string}[];
  if(taskRes.length === 0) {
    return false;
  }
  // It's a user's default list
  if(taskRes[0].created_by_id === userId && taskRes[0].list_id === 0) {
    return true
  }

  const listRes = await sql`
    SELECT * FROM lists WHERE id = ${taskRes[0].list_id} and (owner_id = ${userId} or owner_id = ${orgId})
  `;
  return listRes.length > 0;
}

export async function getUserInboxTasks(userId: string) {
  return await sql`
    SELECT * FROM tasks WHERE created_by_id = ${userId} and list_id = 0 and is_done = false;
  `;
}

export async function getTasksForOwner(ownerId: string) {
  return await sql`
    SELECT * FROM tasks WHERE owner_id = ${ownerId} and is_done = false;
  `;
}

export async function getCompletedTasksForOwner(ownerId: string, limit: number = 10) {
  return await sql`
    SELECT * FROM tasks WHERE owner_id = ${ownerId} and is_done = true limit ${limit};
  `;
}

export async function createTask(listId: number, createdById: string, task: string) {
  return await sql`
    INSERT INTO tasks (list_id, created_by_id, name) VALUES (${listId}, ${createdById}, ${task})
  `;
}

export async function deleteTask(ownerId: string, taskId: number) {
  return await sql`
    DELETE FROM tasks WHERE owner_id = ${ownerId} AND id = ${taskId}
  `;
}

export async function completeTask(taskId: number) {
  return await sql`
    UPDATE tasks SET is_done = true WHERE id = ${taskId}
  `;
}

export async function uncompleteTask(taskId: number) {
  return await sql`
    UPDATE tasks SET is_done = false WHERE id = ${taskId}
  `;
}

export async function createList(userId: string, ownerId: string, name: string) {
  return await sql`
    INSERT INTO lists (owner_id, created_by_id, name) VALUES (${ownerId}, ${userId}, ${name})
  `;
}

export async function getLists(ownerId: string) {
  return await sql`
    SELECT * FROM lists WHERE owner_id = ${ownerId}
  `;
}

export async function getTasksForList(userId: string, orgId: string, listId: number) {
  const listRes = await sql`
    SELECT * FROM lists WHERE id = ${listId} and (owner_id = ${userId} or owner_id = ${orgId}) limit 1
  `;
  if(listRes.length === 0) {
    return []
  } else {
    return await sql`
      SELECT * FROM tasks WHERE list_id = ${listId};
    `
  }
}