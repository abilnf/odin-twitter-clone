import styled from "styled-components/macro";
import { useUserContext } from "../context/UserContext";
import AutoExpandTextArea from "./AutoExpandTextArea";

import imageIcon from "../assets/icons/image.svg";
import gifIcon from "../assets/icons/gif.svg";
import pollIcon from "../assets/icons/poll.svg";
import emojiIcon from "../assets/icons/emoji.svg";
import scheduleIcon from "../assets/icons/schedule.svg";
import locationIcon from "../assets/icons/location.svg";
import { useRef, useState } from "react";
import {
  addDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import closeIcon from "../assets/icons/close.svg";
import { useRerender } from "../hooks/general";

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
  background-color: transparent;
  border: 0;
  resize: none;
  outline: 0;
`;

const FieldContainer = styled.div`
  grid-row: 1;
  grid-column: 2 / -1;
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

const TweetFieldImageContainer = styled.div`
  position: relative;
  margin-top: 5px;
`;

const TweetFieldImageRemove = styled.button`
  position: absolute;
  top: -5px;
  left: -5px;
  padding: 0;
  border: 0;
  outline: 0;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.bd};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 18px;
    height: 18px;
    filter: ${(props) => !props.theme.dark && "invert(1)"};
  }
`;

const TweetFieldImage = styled.img`
  max-height: 100vh;
  max-width: 100%;
  object-fit: contain;
`;

const HiddenInput = styled.input`
  display: none;
`;

function TweetField(props) {
  // const forceRerender = useRerender();
  const user = useUserContext();

  const textRef = useRef();
  const tweetImageRef = useRef();
  const tweetImageInputRef = useRef();
  const [tweetImage, setTweetImage] = useState();

  function resetImage() {
    tweetImageInputRef.current.value = "";
    setTweetImage("");
  }

  async function sendTweet() {
    const text = textRef.current.value.trim();
    if (text || tweetImageInputRef.current.files.length) {
      textRef.current.value = "";
      tweetImageRef.current.src = "";
      const docId = nanoid();
      const tweetRef = doc(db, "tweets", docId);
      const creationPromise = setDoc(tweetRef, {
        uid: user.uid,
        text: text,
        time: new Date(),
      });

      if (tweetImageInputRef.current.files) {
        const file = tweetImageInputRef.current.files[0];
        resetImage();

        const newImageRef = ref(storage, `images/${user.uid}/${docId}`);

        const [ignored, data] = await Promise.all([
          creationPromise,
          uploadBytesResumable(newImageRef, file).then(async (fileSnapshot) => {
            const publicImageUrl = await getDownloadURL(newImageRef);
            return { fileSnapshot, publicImageUrl };
          }),
        ]);

        updateDoc(tweetRef, {
          imageUrl: data.publicImageUrl,
          imageStoragePath: data.fileSnapshot.metadata.fullPath,
        });
      }
    }
  }

  return (
    <Grid>
      <Avatar src={user.photoURL} />
      <FieldContainer>
        <Field
          ref={textRef}
          cols="53"
          maxLength="280"
          rows={props.minRows}
          placeholder="What's happening?"
          onKeyPress={(e) => {
            if ((e.charCode === 10 || e.charCode === 13) && e.ctrlKey) {
              sendTweet();
              props.onSendTweet();
            }
          }}
        />
        <TweetFieldImageContainer>
          <TweetFieldImage ref={tweetImageRef} src={tweetImage} />
          {tweetImage && (
            <TweetFieldImageRemove onClick={resetImage}>
              <img src={closeIcon} alt="Remove" />
            </TweetFieldImageRemove>
          )}
        </TweetFieldImageContainer>
      </FieldContainer>
      <WhoCanReplyContainer>
        <WhoCanReply>Everyone can reply</WhoCanReply>
      </WhoCanReplyContainer>
      <MediaButton column="2">
        <label>
          <HiddenInput
            ref={tweetImageInputRef}
            accept=".jpg, .jpeg, .png"
            type="file"
            onChange={(e) => {
              e.preventDefault();
              const file = e.target.files[0];

              tweetImageRef.current.file = file;

              const reader = new FileReader();
              reader.onload = (e) => {
                setTweetImage(e.target.result);
              };
              reader.readAsDataURL(file);
            }}
          />
          <img src={imageIcon} alt="Images" />
        </label>
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

TweetField.defaultProps = {
  onSendTweet: () => {},
};

export default TweetField;
