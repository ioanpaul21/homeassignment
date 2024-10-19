import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#00AFB9", // Main primary color (blue)
      light: "#63a4ff", // Lighter shade of the primary color
      dark: "#004ba0", // Darker shade of the primary color
      contrastText: "#fff", // Text color for the primary color
    },
    secondary: {
      main: "#00AFB9", // Main secondary color (red/pink)
      light: "#ff5c8d", // Lighter shade of the secondary color
      dark: "#ffe548", // Darker shade of the secondary color
      contrastText: "#fff", // Text color for the secondary color
    },
    background: {
      default: "#f7f7f8", // Background color of the app
      paper: "#fff", // Background color for cards or paper components
    },
    text: {
      primary: "#333", // Primary text color
      secondary: "#666", // Secondary text color
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});
