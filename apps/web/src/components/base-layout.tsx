import type { PropsWithChildren } from "react";
import { Navbar } from "./navbar";

export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
