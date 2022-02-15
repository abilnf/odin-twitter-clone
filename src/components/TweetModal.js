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
import TweetField from "./TweetField";

const ModalContainer = styled.div`
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
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bd};
  gap: 16px;
`;
const Icon = styled.img`
  filter: ${(props) => !props.theme.dark && "invert(1)"};
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
function TweetModal(props) {
  return (
    <ModalContainer onClick={props.closeModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Icon src={closeButton} onClick={props.closeModal} />
        <TweetField minRows="3" />
      </Modal>
    </ModalContainer>
  );
}

export default TweetModal;
