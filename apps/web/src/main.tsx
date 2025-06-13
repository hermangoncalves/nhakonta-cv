import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.tsx";
import { env } from "./lib/env.ts";
import { routes } from "./router.tsx";
import APIInterceptorProvider from "./components/providers/api-interceptors.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={env.CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl={routes.home}
      signUpFallbackRedirectUrl={routes.home}
      signInFallbackRedirectUrl={routes.home}
    >
      <APIInterceptorProvider>
        <App />
      </APIInterceptorProvider>
    </ClerkProvider>
  </StrictMode>
);
