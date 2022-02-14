import { createContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled, {
  ThemeProvider,
  createGlobalStyle,
} from "styled-components/macro";
import { UserContextProvider } from "./context/UserContext";
import { useUser } from "./hooks/firebase";
import { useToggle } from "./hooks/general";
import Login from "./pages/Login";
import Main from "./pages/Main";

const GlobalStyle = createGlobalStyle`

*, *::after, *::before {
  box-sizing: border-box;
}

html {
  color-scheme: ${({ theme }) => (theme.dark ? "dark" : "light")};
}

body {
  background-color: ${(props) => props.theme.b};
  margin: 0;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p,span,h1,h2,h3,h4,h5,h6 {
  color: ${(props) => props.theme.f};
}

`;

function App(props) {
  const [theme, toggleTheme] = useToggle(true);
  const [user, loading] = useUser();

  return (
    <ThemeProvider theme={!theme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <UserContextProvider user={user}>
        {!loading && (user ? <Main /> : <Login />)}
      </UserContextProvider>
    </ThemeProvider>
  );
}

const lightTheme = {
  p: "#f57c00",
  pd: "#bb4d00",
  pl: "#f57c0055",
  pfilter:
    "brightness(0) saturate(100%) invert(46%) sepia(96%) saturate(1042%) hue-rotate(2deg) brightness(97%) contrast(104%);",
  s: "#000000",
  sd: "#212121",
  b: "#ffffff",
  bd: "#eeeeee",
  f: "#000000",
  fs: "#484848",
  fi: "#ffffff",
  dark: false,
};

const darkTheme = {
  p: "#f57c00",
  pd: "#bb4d00",
  pl: "#f57c0033",
  pfilter:
    "brightness(0) saturate(100%) invert(46%) sepia(96%) saturate(1042%) hue-rotate(2deg) brightness(97%) contrast(104%);",
  s: "#ffffff",
  sd: "f5f5f5",
  b: "#000000",
  bd: "#212121",
  f: "#ffffff",
  fs: "#484848",
  fi: "#000000",
  dark: true,
};

export default App;
