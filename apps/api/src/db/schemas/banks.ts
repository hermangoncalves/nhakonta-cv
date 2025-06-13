import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "./timestamps";
import { InferInsertModel, relations } from "drizzle-orm";
import { users } from "./users";

export const banks = sqliteTable('bank_accounts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    clerkId: text('clerk_id').notNull().references(() => users.clerkId, { onDelete: 'cascade' }),
    bankName: text('bank_name').notNull(),
    accountNumber: text('account_number').notNull(),
    accountNIB: text('account_nib').notNull(),
    accountHolderName: text('account_holder_name').notNull(),
    ...timestamps,
})

export const banksRelations = relations(banks, ({ one, many }) => ({
    user: one(users, {
        fields: [banks.userId],
        references: [users.id],
    }),
}));


export type BankInsertModel = InferInsertModel<typeof banks>