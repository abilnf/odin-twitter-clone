import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import background from "../assets/background.png";
import Logo from "../components/Logo";
import { auth } from "../firebase";

const Grid = styled.div`
  display: grid;
  grid: 25% auto auto 1fr 40px / 60% 1fr;
  height: 100vh;
  column-gap: 16px;
`;

const Image = styled.div`
  grid-row: 1 / -2;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Footer = styled.div`
  background-color: ${(props) => props.b};
  grid-row: -2;
  grid-column: 1 / -1;

  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;

  a {
    color: ${(props) => props.theme.fs};
    text-decoration: none;
    font-size: 0.8rem;
  }
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.f};
  font-size: 4rem;
  margin: 32px 0;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.f};
  font-size: 3rem;
  margin: 32px 0;
`;

const Button = styled.button`
  align-self: flex-start;
  justify-self: start;
  padding: 8px 48px;
  font-size: 1.2rem;
  border-radius: 1.2rem;
  border: 0;
  background-color: ${(props) => props.theme.s};
  color: ${(props) => props.theme.fi};
  font-weight: bold;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  align-self: end;
`;

function Login() {
  return (
    <Grid>
      <Image>
        <img src={background} alt="" />
        <Logo size="40%" color={(props) => props.theme.p} />
      </Image>
      <LogoContainer>
        <Logo size="10%" color={(props) => props.theme.p} />
      </LogoContainer>
      <H1>Happening now</H1>
      <H2>Join Tw!tter today.</H2>
      <Button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
        Sign up with Google
      </Button>
      <Footer>
        <Link to="#">About</Link>
        <Link to="#">Help Center</Link>
        <Link to="#">Terms of Service</Link>
        <Link to="#">Privacy Policy</Link>
        <Link to="#">Cookie Policy</Link>
        <Link to="#">Accessibility</Link>
        <Link to="#">Ads info</Link>
        <Link to="#">Blog</Link>
        <Link to="#">Status</Link>
        <Link to="#">Careers</Link>
        <Link to="#">Brand Resourcse</Link>
        <Link to="#">Advertising</Link>
        <Link to="#">Marketing</Link>
        <Link to="#">Twitter for Business</Link>
        <Link to="#">Developers</Link>
        <Link to="#">Directory</Link>
        <Link to="#">Settings</Link>
        <Link to="#">&copy; 2022 Nils Göbl</Link>
      </Footer>
    </Grid>
  );
}

export default Login;
