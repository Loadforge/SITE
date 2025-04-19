import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./contexts/theme/theme";
import { Router } from "./router";

export function App() {
  const [isMobile, setIsMobile] = useState(false);
  const theme: "light" | "dark" | "system" = "system";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme={theme}>
      <BrowserRouter>
        {isMobile && (
          <div className="fixed top-0 left-0 bg-background w-full h-full right-0 bottom-0 flex items-center justify-center p-6 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Apologies for the inconvenience!
              </h2>
              <p className="text-gray-500">
                Our application is optimized for a better experience on larger
                devices like computers. For the best experience, please use a
                desktop.
              </p>
            </div>
          </div>
        )}
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}
