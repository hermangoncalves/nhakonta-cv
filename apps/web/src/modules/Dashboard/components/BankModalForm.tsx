import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  createBankAccountSchema,
  type BankAccount,
  type CreateBankAccount,
  type UpdateBankAccount,
} from "@/schemas";
import { useCreateBank } from "../hooks/useCreateBank";
import { useReward } from "react-rewards";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PropsWithChildren } from "react";
import { useUpdateBank } from "../hooks/use-update-banks";

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

type BankModalFormProps = {
  initialData?: BankAccount;
  isEditing?: boolean;
} & PropsWithChildren;

export function BankModalForm({
  children,
  initialData,
  isEditing,
}: BankModalFormProps) {
  const { mutate: createBank } = useCreateBank();
  const { mutate: updateBank } = useUpdateBank();
  const { reward: confettiReward } = useReward("rewardId", "confetti");

  const form = useForm<CreateBankAccount>({
    resolver: zodResolver(createBankAccountSchema),
    defaultValues: {
      bankName: initialData?.bankName ?? "",
      accountHolderName: initialData?.accountHolderName ?? "",
      accountNumber: initialData?.accountNumber ?? "",
      accountNIB: initialData?.accountNIB ?? "",
    },
  });

  const onSumbit = (data: CreateBankAccount | UpdateBankAccount) => {
    if (isEditing && initialData?.id) {
      handleUpdateBankAccount(data);
      return;
    }

    handleCreateBankAccount(data as CreateBankAccount);
  };

  const handleCreateBankAccount = (data: CreateBankAccount) => {
    createBank(data, {
      onSuccess: () => {
        toast.success("Conta bancária adicionada com sucesso!");
        confettiReward();
      },
      onError: (error) => {
        toast.error("Erro ao adicionar conta bancária. Tente novamente.");
        console.error("Error creating bank account:", error);
      },
    });
  };

  const handleUpdateBankAccount = (data: UpdateBankAccount) => {
    if (!initialData?.id) {
      toast.error("ID da conta bancária não encontrado.");
      return;
    }

    updateBank(
      {
        bankId: initialData.id,
        data,
      },
      {
        onSuccess: () => {
          toast.success("Conta bancária atualizada com sucesso!");
        },
        onError: (error) => {
          toast.error("Erro ao atualizar conta bancária. Tente novamente.");
          console.error("Erro ao atualizar conta bancária:", error);
        },
      }
    );
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Conta Bancária" : "Adicionar Nova Conta"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados da sua conta bancária
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-4">
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

              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">
                    {isEditing ? "Salvar Alterações" : "Salvar"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
