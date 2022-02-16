import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useDocument, useUser } from "../hooks/firebase";
import moreIcon from "../assets/icons/more.svg";
import { useToggle } from "../hooks/general";
import { useUserContext } from "../context/UserContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

const Grid = styled.div`
  display: grid;
  grid: auto 1fr auto / auto auto auto auto 1fr auto;
  gap: 8px;
  margin-top: 4px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  grid-row: 1 / -2;
  margin-right: 8px;
  margin-top: -4px;
`;

const ContentContainer = styled.div`
  grid-row: 2;
  grid-column: 2 / -1;
`;

const Text = styled.p`
  margin: 0;
  word-wrap: break-word;
  overflow: hidden;
  /* word-break: break-all; */
`;

const Username = styled.span`
  font-weight: bold;
`;

const AtName = styled.span`
  color: ${({ theme }) => theme.fs};
`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Icon = styled.img`
  filter: ${({ theme }) => theme.fsfilter};
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: all 200ms ease;
  border-radius: 100%;
  &:hover {
    filter: ${({ theme }) => theme.pfilter};
    background-color: ${({ theme }) => theme.pl};
  }
`;

const MenuContainer = styled.div`
  position: relative;
`;

const MenuBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* z-index: -1; */
`;

const MenuList = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  /* z-index: 1; */
  background-color: ${({ theme }) => theme.b};
  border: 1px solid ${({ theme }) => theme.bd};
  box-shadow: 0 0 3px ${({ theme }) => theme.bd};
  border-radius: 8px;

  * {
    user-select: none;
  }
`;

function Menu(props) {
  const [visible, setVisible] = useState(false);
  return (
    <MenuContainer>
      <div onClick={() => setVisible(true)}>{props.icon}</div>
      {visible && (
        <div>
          <MenuBackdrop onClick={() => setVisible(false)}></MenuBackdrop>
          <MenuList
            onClick={() => {
              setVisible(false);
            }}
          >
            {props.children}
          </MenuList>
        </div>
      )}
    </MenuContainer>
  );
}

const MenuItemIcon = styled.img`
  filter: ${(props) => !props.theme.dark && "invert(1)"};
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const MenuItemText = styled.span`
  font-size: 1.2rem;
  vertical-align: middle;
  margin-left: 8px;
  font-weight: 300;
`;
const MenuItemButton = styled.button`
  width: max-content;
  padding: 12px;
  transition: all 200ms ease;
  border: 0;
  outline: 0;
  background: transparent;

  &:hover {
    background-color: ${(props) => props.theme.bd};
  }
`;

function MenuItem(props) {
  return (
    <MenuItemButton onClick={props.onClick}>
      <MenuItemIcon
        src={require(`../assets/icons/${props.icon}.svg`)}
        alt="Icon"
      />
      {props.text && <MenuItemText>{props.text}</MenuItemText>}
    </MenuItemButton>
  );
}

const TweetImage = styled.img`
  max-height: 100vh;
  max-width: 100%;
  object-fit: contain;
`;

function Tweet({ tweet }) {
  const user = useUserContext();
  const userData = useDocument("users", tweet.uid);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = currentTime.getTime() / 1000 - tweet.time.seconds;

  let formattedTime;
  if (time < 60) {
    formattedTime = `${Math.floor(time)}s`;
  } else if (time < 60 * 60) {
    formattedTime = `${Math.floor(time / 60)}m`;
  } else if (time < 60 * 60 * 24) {
    formattedTime = `${Math.floor(time / 60 / 24)}h`;
  } else {
    const date = new Date(tweet.time.seconds * 1000);
    formattedTime = `${months[date.getMonth()]} ${date.getDate()}`;
    if (Math.floor(time / 31536000) >= 1)
      formattedTime += `, ${date.getFullYear()}`;
  }
  return (
    <Grid>
      <Avatar src={userData.avatar} />
      <Username>{userData.name}</Username>
      <AtName>{userData.at}</AtName>
      <AtName>·</AtName>
      <AtName>{formattedTime}</AtName>
      <Menu icon={<Icon src={moreIcon} />}>
        {tweet.uid === user.uid && (
          <MenuItem
            text="Delete Twǝǝt"
            icon="delete"
            onClick={() => {
              deleteDoc(doc(db, "tweets", tweet.docId));
              if (tweet.imageUrl) {
                deleteObject(ref(storage, `images/${user.uid}/${tweet.docId}`));
              }
            }}
          />
        )}
        {tweet.uid !== user.uid && (
          <MenuItem text="Block User" icon="block" onClick={() => {}} />
        )}
      </Menu>
      <ContentContainer>
        <Text>{tweet.text}</Text>
        {tweet.imageUrl && <TweetImage src={tweet.imageUrl} />}
      </ContentContainer>
    </Grid>
  );
}

export default Tweet;
