import styled from "styled-components/macro";
import { useUserContext } from "../context/UserContext";
import AutoExpandTextArea from "./AutoExpandTextArea";

import imageIcon from "../assets/icons/image.svg";
import gifIcon from "../assets/icons/gif.svg";
import pollIcon from "../assets/icons/poll.svg";
import emojiIcon from "../assets/icons/emoji.svg";
import scheduleIcon from "../assets/icons/schedule.svg";
import locationIcon from "../assets/icons/location.svg";
import { useRef } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "nanoid";

const Grid = styled.div`
  display: grid;
  grid: repeat(3, auto) / repeat(7, auto) 1fr auto;
  gap: 16px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  grid-row: 1;
`;

const Field = styled(AutoExpandTextArea)`
  font-size: 1.2rem;
  /* min-height: 3.6rem; */
  grid-row: 1;
  grid-column: 2 / -1;
  background-color: transparent;
  border: 0;
  resize: none;
  outline: 0;
`;

const WhoCanReplyContainer = styled.div`
  grid-column: 2 / -1;
  grid-row: 2;
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

const PrimaryButton = styled.button`
  font-weight: bold;
  background-color: ${({ theme }) => theme.p};
  border: 0;
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 200ms ease;

  grid-row: -2;
  grid-column: -2;

  &:hover {
    background-color: ${({ theme }) => theme.pd};
  }
`;

function TweetField(props) {
  const user = useUserContext();

  const textRef = useRef();

  function sendTweet() {
    const text = textRef.current.value.trim();
    if (text) {
      setDoc(doc(db, "tweets", nanoid()), {
        uid: user.uid,
        text: text,
        time: new Date(),
      });
      textRef.current.value = "";
    }
  }

  return (
    <Grid>
      <Avatar src={user.photoURL} />
      <Field
        ref={textRef}
        cols="53"
        maxLength="280"
        rows={props.minRows}
        placeholder="What's happening?"
      ></Field>
      <WhoCanReplyContainer>
        <WhoCanReply>Everyone can reply</WhoCanReply>
      </WhoCanReplyContainer>
      <MediaButton column="2">
        <img src={imageIcon} alt="Images" />
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
      <PrimaryButton
        onClick={() => {
          sendTweet();
          props.onSendTweet();
        }}
      >
        Twǝǝt
      </PrimaryButton>
    </Grid>
  );
}

export default TweetField;
