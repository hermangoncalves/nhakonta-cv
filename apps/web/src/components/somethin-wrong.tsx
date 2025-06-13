import { BaseLayout } from "./base-layout";

export function SomethingWrong() {
  return (
    <BaseLayout>
      <div className="flex w-full h-screen justify-center items-center">
        Ups, algo deu Errado...
      </div>
    </BaseLayout>
  );
}
