import type { PropsWithChildren } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Toaster } from "@/components/ui/sonner";

export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-2">{children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
