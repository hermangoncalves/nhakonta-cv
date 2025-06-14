import { BaseLayout } from "@/components/base-layout";
import { useUser } from "@clerk/clerk-react";
import { useCallback, useEffect } from "react";
import { usecreateUser } from "./hooks/useCreateUser";
import type { CreateUser } from "@/schemas";
import { SomethingWrong } from "@/components/somethin-wrong";
import { DashboardBody } from "./components/dashboard";

export default function Dashboard() {
  const { user } = useUser();
  const { mutate: createUser, isError, isPending } = usecreateUser();

  const handleUserCreation = useCallback(() => {
    if (
      !user?.emailAddresses?.[0]?.emailAddress ||
      !user?.externalAccounts?.[0] ||
      !user.firstName ||
      !user.lastName
    )
      return;

    const data: CreateUser = {
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      provider: user.externalAccounts[0].provider,
      providerId: user.externalAccounts[0].id,
    };

    createUser(data);
  }, [user, createUser]);

  useEffect(() => {
    const userCreated = user?.publicMetadata?.userCreated === true;
    if (userCreated) return;

    handleUserCreation();
  }, [user, createUser]);

  if (isPending) return <div>Carregando...</div>;
  if (isError) return <SomethingWrong />;

  return (
    <BaseLayout>
      <DashboardBody userFirsName={user?.firstName || ""} />
    </BaseLayout>
  );
}
