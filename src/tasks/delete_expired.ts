import { db } from "../db/database";

export async function deleteExpiredPastes() {
  await db.query("delete from paste where created_at < time::now() -1h ");
}
