import { Button } from "@/components/ui/button";


export function CTA() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
      <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
        Pronto para começar?
      </h3>
      <p className="mb-4 max-w-3xl text-muted-foreground lg:text-lg">
        Junte-se aos cabo-verdianos que já facilitaram suas transações com o
        nhakonta
      </p>
      <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
        <Button size="lg" className="mt-10">
          Começar agora
        </Button>
      </div>
    </div>
  );
}
