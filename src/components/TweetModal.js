import styled from "styled-components/macro";
import { useUserContext } from "../context/UserContext";
import AutoExpandTextArea from "./AutoExpandTextArea";

import closeButton from "../assets/icons/close.svg";
import imageIcon from "../assets/icons/image.svg";
import gifIcon from "../assets/icons/gif.svg";
import pollIcon from "../assets/icons/poll.svg";
import emojiIcon from "../assets/icons/emoji.svg";
import scheduleIcon from "../assets/icons/schedule.svg";
import locationIcon from "../assets/icons/location.svg";

const GridContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0005;
`;
const Grid = styled.div`
  display: grid;
  grid: repeat(4, auto) / repeat(7, auto) 1fr auto;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bd};
  gap: 16px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  grid-row: 2;
`;

const Field = styled(AutoExpandTextArea)`
  font-size: 1.2rem;
  /* min-height: 3.6rem; */
  grid-row: 2;
  grid-column: 2 / -1;
  background-color: transparent;
  border: 0;
  resize: none;
  outline: 0;
`;

const Icon = styled.img`
  filter: ${(props) => !props.theme.dark && "invert(1)"};
  width: 32px;
  height: 32px;
`;

const WhoCanReplyContainer = styled.div`
  grid-column: 2 / -1;
  grid-row: 3;
  border-bottom: 1px solid ${({ theme }) => theme.fs};
`;

const WhoCanReply = styled.p`
  color: ${({ theme }) => theme.p};
  font-weight: bold;
`;

const MediaButton = styled.button`
  grid-column: ${({ column }) => column};
  grid-row: -2;
  border-radius: 100%;
  padding: 0;
  border: 0;
  padding: 2px;
  width: 28px;
  height: 28px;

  transition: all 200ms ease;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.pl};
  }
  img {
    filter: ${({ theme }) => theme.pfilter};
  }
`;

function TweetModal(props) {
  const user = useUserContext();

  return (
    <GridContainer>
      <Grid>
        <Icon src={closeButton} />
        <Avatar src={user.photoURL} />
        <Field cols="53" rows="3" placeholder="What's happening?"></Field>
        <WhoCanReplyContainer>
          <WhoCanReply>Everyone can reply</WhoCanReply>
        </WhoCanReplyContainer>
        <MediaButton column="2">
          <img src={imageIcon} alt="Image" />
        </MediaButton>
        <MediaButton column="3">
          <img src={gifIcon} alt="Gif" />
        </MediaButton>
        <MediaButton column="4">
          <img src={pollIcon} alt="Poll" />
        </MediaButton>
        <MediaButton column="5">
          <img src={emojiIcon} alt="Emoji" />
        </MediaButton>
        <MediaButton column="6">
          <img src={scheduleIcon} alt="Schedule" />
        </MediaButton>
        <MediaButton column="7">
          <img src={locationIcon} alt="Location" />
        </MediaButton>
      </Grid>
    </GridContainer>
  );
}

export default TweetModal;
