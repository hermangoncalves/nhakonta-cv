import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BankAccountsCards } from "./accountsCards";
import { useState } from "react";
import { BankAccountModalForm } from "./BankAccountModalForm";
import {} from "@/schemas";

export function BankAccounts() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2
          id="rewardId"
          className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300"
        >
          Minhas Contas
        </h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Conta
        </Button>
      </div>
      <BankAccountsCards setShowAddForm={setShowAddForm} />

      {showAddForm && (
        <BankAccountModalForm
          setShowAddForm={setShowAddForm}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
