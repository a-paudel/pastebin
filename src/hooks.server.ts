import type { Handle } from "@sveltejs/kit";
import { deleteExpiredPastes } from "./tasks/delete_expired";

export const handle: Handle = async ({ event, resolve }) => {
  let tasks = [deleteExpiredPastes()];
  // await all tasks
  await Promise.all(tasks);
  let resp = await resolve(event);
  return resp;
};
