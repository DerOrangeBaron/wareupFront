import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { WebRouter } from "./router";
import { AuthProvider } from "./contexts";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

export default function App() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-50BP413HB0");
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <WebRouter />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
