import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BankAccountsCards } from "./accountsCards";
import { useState } from "react";
import { BankAccountModalForm } from "./BankAccountModalForm";
import {} from "@nhakonta/shared";

export function BankAccounts() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Minhas Contas
        </h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Conta
        </Button>
      </div>
      <BankAccountsCards />

      {showAddForm && (
        <BankAccountModalForm
          setShowAddForm={setShowAddForm}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
