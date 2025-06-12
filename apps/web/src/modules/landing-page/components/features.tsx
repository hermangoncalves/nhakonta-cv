import {
  Building2,
  Link2,
  QrCode,
  Share2,
  Shield,
  Smartphone,
} from "lucide-react";

interface Reason {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const reasons: Reason[] = [
  {
    title: "Segurança Total",
    description:
      "Controle completo sobre privacidade e tempo de expiração dos dados compartilhados",
    icon: <Shield className="size-6" />,
  },
  {
    icon: <Building2 className="size-6" />,
    title: "Múltiplos Bancos",
    description:
      "Centralize dados de BCA, BCN, Caixa Económica, BAI CV e outros bancos locais",
  },
  {
    icon: <Share2 className="size-6" />,
    title: "Compartilhamento Rápido",
    description:
      "Compartilhe via WhatsApp, Messenger, SMS ou email com um simples clique",
  },
  {
    icon: <QrCode className="size-6" />,
    title: "Compartilhamento via QR Code",
    description:
      "Gere um QR Code com os dados da conta para facilitar o envio e leitura",
  },
  {
    icon: <Smartphone className="size-6" />,
    title: "Mobile First",
    description:
      "Interface otimizada para dispositivos móveis, fácil de usar em qualquer lugar",
  },
  {
    icon: <Link2 className="size-6" />,
    title: "Link Temporário",
    description:
      "Crie links de compartilhamento que expiram automaticamente após um tempo definido ou após serem acessados",
  },
];

const Features = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            Porque utilizar o nhaKonta?
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-14 sm:size-16 items-center justify-center rounded-full bg-accent">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Features };
