import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    id: "1",
    question: "O que é o nhaKonta?",
    answer:
      "O nhaKonta é um aplicativo web progressivo (PWA) que permite guardar e organizar informações bancárias com segurança. Com ele, você compartilha facilmente os dados com outras pessoas via links, QR Code ou mensagem.",
  },
  {
    id: "2",
    question: "Preciso instalar o nhaKonta pela App Store ou Play Store?",
    answer:
      "Não! Como é um PWA, você pode instalar diretamente pelo navegador, sem precisar passar por lojas de apps. Basta acessar o site e escolher 'Adicionar à tela inicial'.",
  },
  {
    id: "3",
    question: "O nhaKonta faz transferências bancárias?",
    answer:
      "Não. O foco do nhaKonta é apenas armazenar e compartilhar informações bancárias de forma segura e prática. As transferências continuam sendo feitas nos apps dos bancos.",
  },
  {
    id: "4",
    question: "Funciona offline?",
    answer:
      "Sim! Como um bom PWA, o nhaKonta permite acesso offline às suas contas salvas, mesmo sem internet. Algumas funções como backup e links exigem conexão.",
  },
  {
    id: "5",
    question: "É seguro guardar meus dados no nhaKonta?",
    answer: "Sim. Os dados são armazenados com criptografia.",
  },
  {
    id: "6",
    question: "O que posso salvar no nhaKonta?",
    answer:
      "Você pode salvar nome do titular, banco, NIB, número da conta, e adicionar notas personalizadas. Ideal para contas pessoais, familiares ou de negócios.",
  },
  {
    id: "7",
    question: "Como funciona o compartilhamento?",
    answer:
      "Você pode copiar os dados formatados para colar em apps de mensagens ou gerar links temporários e QR Codes para compartilhamento rápido e seguro.",
  },
  {
    id: "8",
    question: "O link de compartilhamento expira automaticamente?",
    answer:
      "Sim. Você pode definir o tempo de expiração do link ou limitar o número de acessos para aumentar a segurança ao partilhar dados sensíveis.",
  },
  {
    id: "10",
    question: "O nhaKonta é gratuito?",
    answer:
      "Sim! O aplicativo é gratuito e já vem com todos os recursos essenciais. Futuramente poderá haver opções premium com funcionalidades avançadas.",
  },
];

export default function Faq() {
  return (
    <section className="mt-8 mb-10">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            Perguntas Frequentes
          </h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg text-start">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
