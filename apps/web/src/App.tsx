import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AppRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
