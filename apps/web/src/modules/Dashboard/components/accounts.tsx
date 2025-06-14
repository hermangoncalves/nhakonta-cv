import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BankAccountsCards } from "./accountsCards";
import {} from "@/schemas";
import { BankModalForm } from "./BankModalForm";

export function BankAccounts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2
          id="rewardId"
          className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300"
        >
          Minhas Contas
        </h2>
        <BankModalForm>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Conta
          </Button>
        </BankModalForm>
      </div>
      <BankAccountsCards />
    </div>
  );
}
