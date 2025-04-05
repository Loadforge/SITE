import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { ThemeProvider } from "./contexts/theme/theme";

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
