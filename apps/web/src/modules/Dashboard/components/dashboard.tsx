import { CreditCard, Share2 } from "lucide-react";
import { useBanks } from "../hooks/use-banks";
import { StatsCard } from "./statsCard";
import { BankAccounts } from "./accounts";
import { SomethingWrong } from "@/components/somethin-wrong";

type DashboardBodyProps = {
  userFirsName: string;
};

export function DashboardBody({ userFirsName }: DashboardBodyProps) {
  const { data: dashboardData, isError } = useBanks();

  if (isError) return <SomethingWrong />

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 dark:text-gray-300">
          Bem-vindo ao seu nhaKonta,{" "}
          <span className="text-primary">{userFirsName}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Gerencie suas contas bancárias e compartilhe dados com segurança
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          count={dashboardData?.totalAccounts || 0}
          heading="Total de Contas"
          icon={<CreditCard className="h-6 w-6 text-primary" />}
        />

        <StatsCard
          count={dashboardData?.totalShared || 0}
          heading="Compartilhamentos"
          icon={<Share2 className="h-6 w-6 text-primary" />}
        />
      </div>
      <BankAccounts />
    </div>
  );
}
