import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./index.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}

      <Index />
    </QueryClientProvider>
  </StrictMode>
);
