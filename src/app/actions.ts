'use server'
import * as db from '@/db';
import { getUserDetails } from '@/lib/utils';

export async function addTask(name: string, listId: number) {
  const { userId, orgId } = getUserDetails();
  console.log(userId, orgId, listId, name)
  if(listId === 0) {
    await db.createTask(listId, userId, name);
    return;
  }
  const isPermitted = await db.isUserPermittedToCreateOnList(userId, orgId, listId);
  if(!isPermitted) throw new Error('User is not permitted to create on this list');
  await db.createTask(listId, userId, name);
}

export async function setTaskState(id: number, completed: boolean) {
  const { userId, orgId } = getUserDetails();

  console.log(userId, orgId, id)
  const isPermitted = await db.isUserPermittedToModifyTask(userId, orgId, id);
  if(!isPermitted) {
    throw new Error('User is not permitted to modify this task');
  }

  if(completed) {
    await db.completeTask(id);
  } else {
    await db.uncompleteTask(id);
  }
}

export async function createUserList(name: string) {
  const { userId } = getUserDetails();
  await db.createList(userId, userId, name)
}

export async function createOrgList(name: string) {
  const { userId, orgId } = getUserDetails();
  await db.createList(userId, orgId, name);
}

export async function getUserLists() {
  const { userId } = getUserDetails();
  return db.getLists(userId);
}

export async function getOrgLists() {
  const { orgId } = getUserDetails();
  if(orgId) {
    return db.getLists(orgId);
  }
  return []
}