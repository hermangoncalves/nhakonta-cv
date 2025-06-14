import { AppBindings } from "@/types";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import * as schema from "@/db/schemas";

export default function getDB(c: Context<AppBindings>) {
  const db = drizzle(c.env.DB, { schema });
  return db;
}

export type DB = ReturnType<typeof getDB>