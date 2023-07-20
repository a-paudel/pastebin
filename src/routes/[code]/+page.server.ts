import { error } from "@sveltejs/kit";
import { db, type Paste } from "../../db/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  let res = await db.query<[Paste[]]>(
    "select * from paste where code = ($code)",
    { code: params.code }
  );
  let pastes = res[0].result;
  if (!pastes || pastes.length === 0) {
    throw error(404, { message: "Paste not found" });
  }
  let paste = pastes[0];
  return {
    paste,
  };
};
