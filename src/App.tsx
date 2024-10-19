import "./App.css";
import Dashboard from "./views/Dashboard";
import Header from "./components/Header";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Header />
      <Dashboard />
    </Box>
  );
}

export default App;
