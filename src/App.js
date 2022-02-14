import styled, { ThemeProvider } from "styled-components/macro";
import { useToggle } from "./utility/hooks";

// connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
// connectFirestoreEmulator(db, "localhost", 8080);
// connectStorageEmulator(storage, "localhost", 9199);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 30% 33% 37%;

  div {
    height: 100vh;
  }

  div:not(:last-child) {
    border-right: 1px solid ${(props) => props.theme.bd};
  }
`;

function App(props) {
  const [theme, toggleTheme] = useToggle(true);

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <Grid></Grid>
    </ThemeProvider>
  );
}

const lightTheme = {
  p: "#f57c00",
  pd: "#bb4d00",
  s: "#000000",
  sd: "#212121",
  b: "#ffffff",
  bd: "#eeeeee",
  f: "#000000",
  fs: "#484848",
  fi: "#ffffff",
};

const darkTheme = {
  p: "#f57c00",
  pd: "#bb4d00",
  s: "#ffffff",
  sd: "f5f5f5",
  b: "#000000",
  bd: "#212121",
  f: "#ffffff",
  fs: "#484848",
  fi: "#000000",
};

// const lightTheme = {
//   p: "#f57c00",
//   pl: "#ffad42",
//   pd: "#bb4d00",

//   bg: "#fafafa",
//   bgl: "#ffffff",
//   bgd: "#c7c7c7",
// };

// const darkTheme = {
//   p: "#f57c00",
//   pl: "#ffad42",
//   pd: "#bb4d00",

//   bg: "#212121",
//   bgl: "#484848",
//   bgd: "#000000",
// };

export default App;
