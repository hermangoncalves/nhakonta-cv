import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, CreditCard, Edit, Plus, Share2, Trash2 } from "lucide-react";
import { useBanks } from "../hooks/use-banks";

export function BankAccountsCards() {
  const { data: dashboardData, isEmpty } = useBanks();
  return (
    <>
      {!isEmpty ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData?.banks.map((bank) => (
            <Card
              key={bank.id}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary " />
                  <span className="dark:text-gray-300">
                    {bank.bankName.split("(")[0].trim()}
                  </span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {bank.accountHolderName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    NIB
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 text-xs sm:text-sm  px-2 py-1 rounded bg-gray-100 dark:bg-background">
                      {bank.accountNIB}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      // onClick={() => copyToClipboard(account.accountNIB, "NIB")}
                      className="p-1 h-7 w-7"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Número da Conta
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 text-xs sm:text-sm px-2 py-1 rounded bg-gray-100 dark:bg-background">
                      {bank.accountNumber}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      // onClick={() =>
                      //   copyToClipboard(
                      //     account.accountNumber,
                      //     "Número da conta"
                      //   )
                      // }
                      className="p-1 h-7 w-7"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    // onClick={() => setShareAccount(account)}
                    className="flex-1"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Compartilhar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    // onClick={() => setEditingAccount(account)}
                    className="p-2"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    // onClick={() => handleDeleteAccount(account.id)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground  mb-2">
                Nenhuma conta adicionada
              </h3>
              <p className="text-muted-foreground  mb-6">
                Adicione sua primeira conta bancária para começar a usar o
                nhakonta
              </p>
              <Button variant="secondary">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeira Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
