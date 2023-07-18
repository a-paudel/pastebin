import { redirect } from "@sveltejs/kit";
import { db } from "../db/database";
import type { Actions } from "./$types";
import { nanoid } from "nanoid";

async function createEntry(content: string) {
  let res = await db
    .insertInto("pastes")
    .values({ content, code: nanoid(3) })
    .returning("code")
    .executeTakeFirst();
  if (!res) {
    return createEntry(content);
  }
  return res.code;
}

export const actions: Actions = {
  default: async ({ request }) => {
    let formData = await request.formData();
    let content = formData.get("content") as string;

    // create an entry in the database
    let code = await createEntry(content);
    throw redirect(302, `/${code}`);
  },
};
