import { error } from "@sveltejs/kit";
import { db } from "../../../db/database";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  let paste = await db
    .selectFrom("pastes")
    .selectAll()
    .where("code", "=", params.code)
    .executeTakeFirst();
  if (!paste) {
    throw error(404, { message: "Paste not found" });
  }
  return new Response(paste.content);
};
