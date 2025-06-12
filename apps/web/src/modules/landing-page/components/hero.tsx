import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { routes } from "@/router";
import { Link } from "react-router-dom";

const lastUsers = {
  count: 200,
  avatars: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      alt: "Avatar 1",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      alt: "Avatar 2",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      alt: "Avatar 3",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      alt: "Avatar 4",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      alt: "Avatar 5",
    },
  ],
};

export function Hero() {
  return (
    <section className="mt-14">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">
            Guarde e compartilhe seus dados bancários com facilidade.
          </h1>
          <p className="text-muted-foreground text-balance lg:text-lg">
            Salve números de conta, NIB e outras informações bancárias em um só
            lugar. Compartilhe com segurança, quando e como quiser.
          </p>
        </div>
        <Button asChild size="lg" className="mt-10">
          <Link to={routes.home}>Começar agora</Link>
        </Button>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            {lastUsers.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-14 border">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>
          <span className="text-sm text-muted-foreground">
            {lastUsers.count} +Caboverdianos
          </span>
        </div>
      </div>
    </section>
  );
}
