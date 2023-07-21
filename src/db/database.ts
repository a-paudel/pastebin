import {
  PUBLIC_SURREAL_DB,
  PUBLIC_SURREAL_NS,
  PUBLIC_SURREAL_PASS,
  PUBLIC_SURREAL_SCOPE,
  PUBLIC_SURREAL_URL,
  PUBLIC_SURREAL_USER,
} from "$env/static/public";
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

export let db = new Surreal(PUBLIC_SURREAL_URL, {
  auth: {
    user: PUBLIC_SURREAL_USER,
    pass: PUBLIC_SURREAL_PASS,
    NS: PUBLIC_SURREAL_NS,
    DB: PUBLIC_SURREAL_DB,
    SC: PUBLIC_SURREAL_SCOPE,
  },
  ns: PUBLIC_SURREAL_NS,
  db: PUBLIC_SURREAL_DB,
});
