import { Link } from "react-router-dom";
import { routes } from "@/router";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export const Navbar = () => {
  return (
    <header className="top-0 z-50">
      <div className="container mx-auto p-2 flex justify-between items-center">
        <Link to={routes.home}>
          <div className="flex items-center space-x-2">
            <div className="w-12">
              <img src="./pwa-192.png" />
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline">
              <User /> Login
            </Button>
          </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
