import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled, {
  ThemeProvider,
  createGlobalStyle,
} from "styled-components/macro";
import { UserContextProvider } from "./context/UserContext";
import { auth, db, getAtName } from "./firebase";
import { useUser } from "./hooks/firebase";
import { useToggle } from "./hooks/general";
import Login from "./pages/Login";
import Main from "./pages/Main";

const GlobalStyle = createGlobalStyle`

*, *::after, *::before {
  box-sizing: border-box;
}

* {
  user-select: none;
}

p,span,h1,h2,h3,h4,h5,h6 {
  user-select: text;
}

a * {
  user-select: none;
}

html {
  color-scheme: ${({ theme }) => (theme.dark ? "dark" : "light")};
}

body {
  background-color: ${(props) => props.theme.b};
  margin: 0;
  font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* overflow: hidden; */
}

p,span,h1,h2,h3,h4,h5,h6 {
  color: ${(props) => props.theme.f};
}

`;

function App(props) {
  const [theme, toggleTheme] = useToggle(true);
  const [user, loading] = useUser();

  const [wasLoggedOut, setWasLoggedOut] = useState(!user && !loading);
  useEffect(() => {
    if (!user && !loading && !wasLoggedOut) setWasLoggedOut(true);
  }, [user, loading, wasLoggedOut]);

  useEffect(() => {
    if (wasLoggedOut && user) {
      async function initUser() {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          setDoc(docRef, {
            name: user.displayName,
            at: getAtName(user),
            avatar: user.photoURL,
          });
        }
      }
      initUser();
      setWasLoggedOut(false);
    }
  }, [user, wasLoggedOut]);

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <GlobalStyle />
      {/* <button onClick={() => signOut(auth)}>test</button> */}
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
  fsfilter:
    "brightness(0) saturate(100%) invert(30%) sepia(0%) saturate(1068%) hue-rotate(134deg) brightness(92%) contrast(97%);",
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
  fs: "#666",
  fsfilter:
    "brightness(0) saturate(100%) invert(39%) sepia(10%) saturate(8%) hue-rotate(62deg) brightness(99%) contrast(96%);",
  fi: "#000000",
  dark: true,
};

export default App;
