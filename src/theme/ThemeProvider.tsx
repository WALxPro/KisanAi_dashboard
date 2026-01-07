import React, { ReactNode } from "react";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

type Props = {
  children: ReactNode;
};

const MuiThemeProvider = ({ children }: Props) => {
  let theme = createTheme({
    typography: {
      fontFamily: "Inter, sans-serif",

      h1: { fontSize: "32px", fontWeight: 700 },
      h2: { fontSize: "24px", fontWeight: 600 },
      h3: { fontSize: "20px", fontWeight: 500 },

      body1: { fontSize: "16px", fontWeight: 400 },
      body2: { fontSize: "14px", fontWeight: 400 },

      button: {
        fontSize: "16px",
        fontWeight: 600,
        textTransform: "none",
      },
    },

    palette: {
      primary: {
        main: "#0a4b0cff",
        light: "#A7E9A0",
      },

      secondary: {
        main: "#002035",
        light: "#F1F1F1",
        dark: "#000000",
      },

      background: {
        default: "#FFFFFF",
        paper: "#F0FFF0",
      },

      text: {
        primary: "#002035",
        secondary: "#4F4F4F",
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
