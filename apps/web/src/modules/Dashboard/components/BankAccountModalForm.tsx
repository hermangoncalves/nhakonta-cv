import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  bankAccountFormSchema,
  type BankAccount,
  type CreateBankAccount,
} from "../schemas";
import { useCreateBank } from "../hooks/useCreateBank";

interface BankAccountModalFormProps {
  initialData?: BankAccount;
  setShowAddForm: (show: boolean) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const banks = [
  {
    name: "Banco Comercial do Atlântico",
    value: "Banco Comercial do Atlântico",
  },
  {
    name: "Banco Caboverdiano de Negócios",
    value: "Banco Caboverdiano de Negócios",
  },
  {
    name: "Caixa Económica de Cabo Verde",
    value: "Caixa Económica de Cabo Verde",
  },
];

export const BankAccountModalForm = ({
  initialData,
  onCancel,
  setShowAddForm,
  isEditing = false,
}: BankAccountModalFormProps) => {
  const { mutate: createBank, isPending: isCreating } = useCreateBank();

  const form = useForm<CreateBankAccount>({
    resolver: zodResolver(bankAccountFormSchema),
    defaultValues: {
      bankName: initialData?.bankName ?? "",
      accountHolderName: initialData?.accountHolderName ?? "",
      accountNumber: initialData?.accountNumber ?? "",
      accountNIB: initialData?.accountNIB ?? "",
    },
  });

  const handleCreateBankAccount = (data: CreateBankAccount) => {
    createBank(data, {
      onSuccess: () => {
        toast.success("Conta bancária adicionada com sucesso!");
        setShowAddForm(false);
      },
      onError: (error) => {
        toast.error("Erro ao adicionar conta bancária. Tente novamente.");
        console.error("Error creating bank account:", error);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg border-none shadow-2xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl text-gray-900">
              {isEditing ? "Editar Conta Bancária" : "Adicionar Nova Conta"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Preencha os dados da sua conta bancária
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel} className="p-2">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateBankAccount)}
              className="space-y-4"
            >
              {/* Nome do Banco */}
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Banco *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o banco" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank.value} value={bank.value}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nome do Titular */}
              <FormField
                control={form.control}
                name="accountHolderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Titular da Conta *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Número da Conta */}
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número da Conta *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NIB */}
              <FormField
                control={form.control}
                name="accountNIB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      NIB (Número de Identificação Bancária) *
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={!form.formState.isValid}>
                  {isCreating ? "Guardando..." : "Continuar"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
