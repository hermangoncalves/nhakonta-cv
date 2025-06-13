import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { routes } from "@/router";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLatestUsersAvatars } from "../hooks/user-latest-users";
import { AvatarFallback } from "@radix-ui/react-avatar";

export function Hero() {
  const { isSignedIn } = useAuth();
  const { data: latestUsers, isEmpty } = useLatestUsersAvatars();

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
        {isSignedIn ? (
          <Button size="lg" className="mt-10">
            <Link to={routes.dashboard}>Dashboard</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button size="lg" className="mt-10">
              Começar agora
            </Button>
          </SignInButton>
        )}
        {latestUsers && !isEmpty && (
          <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="mx-4 inline-flex items-center -space-x-4">
              {latestUsers?.users.map((user, index) => (
                <Avatar key={index} className="size-14 border">
                  {user.imageUrl && (
                    <AvatarImage src={user.imageUrl} alt={user.firstName} />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </span>
            <span className="text-sm text-muted-foreground">
              {latestUsers?.count} +Caboverdianos
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
