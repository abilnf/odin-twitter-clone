import { useEffect } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components/macro";
import Logo from "../components/Logo";
import TweetModal from "../components/TweetModal";
import { useUserContext } from "../context/UserContext";
import { getAtName } from "../firebase";
import { useToggle } from "../hooks/general";
import Home from "./Home";

function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  });
  return <div></div>;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 30% 33% 37%;

  & > div {
    height: 100vh;
  }

  & > div:not(:last-child) {
    border-right: 1px solid ${(props) => props.theme.bd};
  }
`;

const SidebarIcon = styled.img`
  filter: ${(props) => !props.theme.dark && "invert(1)"};
  width: 32px;
  height: 32px;
  vertical-align: middle;
`;

const SidebarText = styled.span`
  font-size: 1.5rem;
  vertical-align: middle;
  margin-left: 16px;
  font-weight: 300;
`;
const SidebarLink = styled(Link)`
  text-decoration: none;
  width: max-content;
  padding: 12px;
  border-radius: 2rem;
  transition: all 200ms ease;

  &:hover {
    background-color: ${(props) => props.theme.bd};
  }
`;

function SidebarItem(props) {
  return (
    <SidebarLink to={props.to}>
      <SidebarIcon
        src={require(`../assets/icons/${props.icon}.svg`)}
        alt="Icon"
      />
      {props.text && <SidebarText>{props.text}</SidebarText>}
    </SidebarLink>
  );
}

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SidebarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 64px 16px 0;
`;

const PrimaryButtonLarge = styled.button`
  font-weight: bold;
  background-color: ${({ theme }) => theme.p};
  border: 0;
  padding: 16px;
  font-size: 1.2rem;
  border-radius: 2rem;
  cursor: pointer;

  transition: all 200ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.pd};
  }
`;

const SidebarProfile = styled(Link)`
  display: grid;
  align-items: flex-end;

  grid: 1fr 1fr / auto 1fr;
  column-gap: 16px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    grid-row: 1 / -1;
  }

  span:first-of-type {
    font-weight: bold;
  }

  span:last-of-type {
    color: ${({ theme }) => theme.fs};
  }

  padding: 12px;
  border-radius: 2rem;
  transition: all 200ms ease;
  &:hover {
    background-color: ${(props) => props.theme.bd};
  }

  text-decoration: none;
`;

const Spacing = styled.div`
  flex-grow: 1;
`;

function Main() {
  const user = useUserContext();

  const [tweetModalOpen, toggleTweetModalOpen] = useToggle(false);

  return (
    <Grid>
      <SidebarContainer>
        <Sidebar>
          <SidebarItem to="/home" text="" icon="logo" />
          <SidebarItem to="/home" text="Home" icon="home" />
          <SidebarItem to="/home" text="Explore" icon="explore" />
          <SidebarItem to="/home" text="Notifications" icon="notifications" />
          <SidebarItem to="/home" text="Messages" icon="messages" />
          <SidebarItem to="/home" text="Bookmarks" icon="bookmarks" />
          <SidebarItem to="/home" text="Lists" icon="lists" />
          <SidebarItem to="/home" text="Profile" icon="profile" />
          <SidebarItem to="/home" text="More" icon="more" />
          <PrimaryButtonLarge onClick={toggleTweetModalOpen}>
            Twǝǝt
          </PrimaryButtonLarge>
          <Spacing />
          <SidebarProfile to={getAtName(user).substring(1)}>
            <img src={user.photoURL} alt="Avatar" />
            <span>{user.displayName}</span>
            <span>{getAtName(user)}</span>
          </SidebarProfile>
        </Sidebar>
      </SidebarContainer>
      <div>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </div>
      <div>single</div>
      {tweetModalOpen && (
        <TweetModal icon="location" closeModal={toggleTweetModalOpen} />
      )}
    </Grid>
  );
}

export default Main;
