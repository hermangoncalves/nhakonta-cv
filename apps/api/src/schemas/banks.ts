import { z } from "@hono/zod-openapi";

export const bankAccountSchema = z.object({
    id: z.number(),
    bankName: z.string().min(1, "Bank name is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    accountNIB: z.string().min(1, "Account NIB is required"),
    accountHolderName: z.string().min(1, "Account holder name is required"),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const createBankAccountSchema = bankAccountSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export const updateBankAccountSchema = createBankAccountSchema.partial();


export const listBankAccountsSchema = z.object({
    banks: z.array(bankAccountSchema),
    totalAccounts: z.number(),
    totalShared: z.number(),
});

export type BankAccount = z.infer<typeof bankAccountSchema>;
export type ListBankAccounts = z.infer<typeof listBankAccountsSchema>;
export type UpdateBankAccount = z.infer<typeof updateBankAccountSchema>;
export type CreateBankAccount = z.infer<typeof createBankAccountSchema>;