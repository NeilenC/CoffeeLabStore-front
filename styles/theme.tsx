import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fa9f1c",
    },
    secondary: {
      main: "#8B4513",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#00000",
      secondary: "#fa9f1c",
    },
  },
  typography: {
    fontFamily: " Rethink Sans, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#556B2F",
    },
    h3: {
      fontFamily: " Rethink Sans, sans-serif",
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
});

export default theme;
