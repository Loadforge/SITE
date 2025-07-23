import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/theme/theme";
import { openDb } from "./db/initialize.db";
import { Router } from "./router";
import { SocketConnector } from "./socket.connector";

export function App() {
  const [isMobile, setIsMobile] = useState(false);
  const theme: "light" | "dark" | "system" = "system";
  const { t } = useTranslation(); 

  useEffect(() => {
    const init = async () => {
      await openDb();

      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      checkScreenSize();

      window.addEventListener("resize", checkScreenSize);

      return () => {
        window.removeEventListener("resize", checkScreenSize);
      };
    };

    init();
  }, []);

  return (
     <ThemeProvider defaultTheme={theme}>
      <BrowserRouter>
        {isMobile && (
          <div className="fixed top-0 left-0 bg-background w-full h-full right-0 bottom-0 flex items-center justify-center p-6 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {t("title")}
              </h2>
              <p className="text-gray-500">{t("message")}</p>
            </div>
          </div>
        )}

        <SocketConnector /> 

        <Router />
        <Toaster
          position="bottom-left"
          duration={5000}
          theme={theme}
          closeButton
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
