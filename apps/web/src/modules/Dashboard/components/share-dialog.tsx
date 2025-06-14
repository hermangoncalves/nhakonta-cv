import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  X,
  Copy,
  Share2,
  Clock,
  Link as LinkIcon,
  MessageCircle,
  Mail,
  Smartphone,
} from "lucide-react";
import type { BankAccount } from "@/schemas";

interface ShareDialogProps {
  bank: BankAccount;
  onClose: () => void;
}

export const ShareDialog = ({ bank, onClose }: ShareDialogProps) => {
  const [shareMethod, setShareMethod] = useState<"direct" | "link">("direct");

  const shareData = `💳 Dados Bancários

🏦 Banco: ${bank.bankName}
👤 Titular: ${bank.accountHolderName}
🔢 NIB: ${bank.accountNIB}
📄 Nº da Conta: ${bank.accountNumber}

📲 Compartilhado via nhaKonta
🌐 https://nhaKonta.pages.dev
`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copiado!", {
      description:
        "Dados copiados para a área de transferência. Agora você pode compartilhar com quem quiser.",
    });
  };

  const shareViaWhatsApp = () => {
    const encodedText = encodeURIComponent(shareData);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  const shareViaSMS = () => {
    const encodedText = encodeURIComponent(shareData);
    window.open(`sms:?body=${encodedText}`, "_blank");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(
      `Dados Bancários - ${bank.accountHolderName}`
    );
    const body = encodeURIComponent(shareData);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg border-none shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl flex items-center text-primary">
              <Share2 className="h-5 w-5 mr-2 text-primary" />
              Compartilhar Conta
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {bank.bankName.split("(")[0].trim()} - {bank.accountHolderName}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Share Method Selection */}
          <div className="space-y-3">
            <Label>Método de Compartilhamento</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={shareMethod === "direct" ? "default" : "outline"}
                onClick={() => setShareMethod("direct")}
                className={`flex flex-col h-auto p-4 ${
                  shareMethod === "direct" ? "bg-primary" : ""
                }`}
              >
                <Copy className="h-5 w-5 mb-2" />
                <span className="text-xs sm:text-sm">Compartilhar Direto</span>
              </Button>
              <Button
                variant={shareMethod === "link" ? "default" : "outline"}
                onClick={() => setShareMethod("link")}
                className={`flex flex-col h-auto p-4 ${
                  shareMethod === "link" ? "bg-primary" : ""
                }`}
              >
                <LinkIcon className="h-5 w-5 mb-2" />
                <span className="text-xs sm:text-sm">Link Temporário</span>
              </Button>
            </div>
          </div>

          {shareMethod === "direct" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Pré-visualização dos Dados</Label>
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {shareData}
                  </pre>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Compartilhar via:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={shareViaWhatsApp}
                    className="flex items-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={shareViaSMS}
                    className="bg-accent flex items-center justify-center dark:text-white"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    SMS
                  </Button>
                  <Button
                    onClick={shareViaEmail}
                    className="bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    onClick={() => copyToClipboard(shareData)}
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {shareMethod === "link" && (
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Funcionalidade em Desenvolvimento
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Esta funcionalidade estará disponível em breve. Estamos
                      trabalhando para permitir links temporários com validade
                      personalizada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="w-full">
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
