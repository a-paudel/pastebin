import { redirect } from "@sveltejs/kit";
import { db, type Paste, type PasteCreate } from "../db/database";
import type { Actions } from "./$types";

async function createEntry(data: PasteCreate) {
  let res = await db.create<Paste, PasteCreate>("paste", data);
  if (res.length === 0) {
    return createEntry(data);
  }
  let paste = res[0];
  return paste.code;
}

export const actions: Actions = {
  default: async ({ request }) => {
    let formData = await request.formData();
    let content = formData.get("content") as string;

    // create an entry in the database
    let code = await createEntry({ content });
    throw redirect(302, `/${code}`);
  },
};
