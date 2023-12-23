import Button from "@mui/material/Button";
import theme from "../../theme/theme";
import { ThemeProvider } from "@mui/material/styles";

export function ContactButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button
        href="/contacts"
        variant="outlined"
        color="secondary"
        sx={{
          borderColor: theme.palette.secondary.main,
          ml: 1,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
        }}
      >
        Contacto
      </Button>
    </ThemeProvider>
  );
}
