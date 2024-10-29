import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Provider from "@/store/Provider.tsx";
import ToastProvider from "./components/ui/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  </StrictMode>,
);
