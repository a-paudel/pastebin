import type { Handle } from "@sveltejs/kit";
import { deleteExpiredPastes } from "../tasks/delete_expired";

export const handle: Handle = async ({ event, resolve }) => {
  await deleteExpiredPastes();
  let resp = await resolve(event);
  return resp;
};
