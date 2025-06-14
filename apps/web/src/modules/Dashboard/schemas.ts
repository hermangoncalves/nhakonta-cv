import { z } from "zod";

export const bankAccountSchema = z.object({
    id: z.number(),
    bankName: z.string({
        required_error: "Banco é obrigatório",
    }).min(1, "Banco é obrigatório"),
    accountNumber: z.string({
        required_error: "Número da conta é obrigatório",
    }).min(1, "Número da conta é obrigatório")
      .regex(/^\d+$/, "Número da conta deve conter apenas dígitos"),
    accountNIB: z.string({
        required_error: "NIB é obrigatório",
    }).min(1, "NIB é obrigatório")
    .regex(/^\d+$/, "NIB deve conter apenas dígitos"),
    accountHolderName: z.string({
        required_error: "Nome do titular é obrigatório",
    }).min(1, "Nome do titular é obrigatório")
      .min(3, "Nome do titular deve ter pelo menos 3 caracteres"),
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