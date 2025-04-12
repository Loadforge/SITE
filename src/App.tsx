import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./contexts/theme/theme";
import { Router } from "./router";

export function App() {
  const theme: "light" | "dark" | "system" = "system";
  return (
    <ThemeProvider defaultTheme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}
