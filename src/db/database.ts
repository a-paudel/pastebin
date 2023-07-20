import {
  SURREAL_DB,
  SURREAL_NS,
  SURREAL_PASS,
  SURREAL_SCOPE,
  SURREAL_URL,
  SURREAL_USER,
} from "$env/static/private";
import { Surreal } from "surrealdb.js";

export type Paste = {
  id: string;
  created_at: string;
  updated_at: string;

  code: string;
  content: string;
};

export type PasteCreate = {
  content: string;
};

export const db = new Surreal(SURREAL_URL, {
  auth: {
    user: SURREAL_USER,
    pass: SURREAL_PASS,
    NS: SURREAL_NS,
    DB: SURREAL_DB,
    SC: SURREAL_SCOPE,
  },
});
