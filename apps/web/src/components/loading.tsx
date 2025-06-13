import { BaseLayout } from "./base-layout";

export function Loading() {
  return (
    <BaseLayout>
      <div className="flex w-full h-screen justify-center items-center">
        Carregando...
      </div>
    </BaseLayout>
  );
}
