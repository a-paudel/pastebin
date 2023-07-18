import { error } from "@sveltejs/kit";
import { db } from "../../db/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  let paste = await db
    .selectFrom("pastes")
    .selectAll()
    .where("code", "=", params.code)
    .executeTakeFirst();
  if (!paste) {
    throw error(404, { message: "Paste not found" });
  }
  return {
    paste,
  };
};
