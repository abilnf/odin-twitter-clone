import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useDocument } from "../hooks/firebase";

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

const Text = styled.p`
  grid-row: 2;
  grid-column: 2 / -1;
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

function Tweet({ tweet }) {
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
      <span>...</span>
      <Text>{tweet.text}</Text>
    </Grid>
  );
}

export default Tweet;
