import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import Navbar from "./components/Navbar";
import Router from "./components/Router";
import { Container } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BA0C2F",
    },
    // secondary: {
    //   main: "#E33E7F",
    // },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Container>
          <Router />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
