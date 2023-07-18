import { db } from "../db/database";

export async function deleteExpiredPastes() {
  // create a cutoff date of one hour
  let cutoffCreatedAt = new Date();
  cutoffCreatedAt.setHours(cutoffCreatedAt.getHours() - 1);

  // delete all pastes that were created before the cutoff date
  await db
    .deleteFrom("pastes")
    .where("created_at", "<", cutoffCreatedAt)
    .execute();
}
