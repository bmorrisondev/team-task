'use server'

import { getUserDetails } from "@/lib/utils";
import * as db from "@/db";

export async function getTasks(listId: number) {
  const { userId, orgId } = getUserDetails();
  return await db.getTasksForList(userId, orgId, listId);
}