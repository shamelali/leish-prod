import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NeonAuthUIProvider } from "@neondatabase/auth/react/ui";
import { authClient } from "./lib/auth-client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NeonAuthUIProvider
        authClient={authClient}
        redirectTo="/"
        social={{
          providers: ["google", "github"],
        }}
      >
        <App />
      </NeonAuthUIProvider>
    </BrowserRouter>
  </StrictMode>,
);
