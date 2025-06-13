import { z } from "zod";

export const bankAccountSchema = z.object({
    id: z.number(),
    bankName: z.string({
        required_error: "Banco é obrigatório",
    }),
    accountNumber: z.string({
        required_error: "Número da conta é obrigatório",
    }),
    accountNIB: z.string({
        required_error: "NIB é obrigatório",
    }),
    accountHolderName: z.string({
        required_error: "Nome do titular é obrigatório",
    }),
    notes: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const bankAccountFormSchema = bankAccountSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const dashboardSchema = z.object({
    bankAccounts: z.array(bankAccountSchema),
    totalAccounts: z.number(),
    totalShared: z.number(),
});

export type DashboardSchema = z.infer<typeof dashboardSchema>;
export type BankAccount = z.infer<typeof bankAccountSchema>;
export type CreateBankAccount = z.infer<typeof bankAccountFormSchema>;