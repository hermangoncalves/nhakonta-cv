import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./timestamps";
import { relations } from "drizzle-orm";
import { bankAccounts } from "./banks";

export const users = sqliteTable(
  "users",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    clerkId: text("clerk_id").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    imageUrl: text("image_url"),
    provider: text("provider"),
    providerId: text("provider_id"),
    ...timestamps,
  }
);

export const usersRelations = relations(users, ({ many }) => ({
  bankAccounts: many(bankAccounts),
}));
