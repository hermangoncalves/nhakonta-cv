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

export const updateBankAccountSchema = bankAccountSchema.partial();

export const listBankAccountsSchema = z.object({
    items: z.array(bankAccountSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
});