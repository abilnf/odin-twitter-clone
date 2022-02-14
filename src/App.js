import { ThemeProvider } from "styled-components";
import { useToggle } from "./utility/hooks";

function App() {
  const [theme, toggleTheme] = useToggle(true);

  return <ThemeProvider theme={theme ? lightTheme : darkTheme}></ThemeProvider>;
}

const lightTheme = {
  p: "#f57c00",
  pl: "#ffad42",
  pd: "#bb4d00",

  bg: "#fafafa",
  bgl: "#ffffff",
  bgd: "#c7c7c7",
};

const darkTheme = {
  p: "#f57c00",
  pl: "#ffad42",
  pd: "#bb4d00",

  bg: "#fafafa",
  bgl: "#ffffff",
  bgd: "#c7c7c7",
};

export default App;
