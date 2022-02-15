import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import styled from "styled-components/macro";
import Tweet from "../components/Tweet";
import TweetField from "../components/TweetField";
import { db } from "../firebase";
import { useCollection, useDocument } from "../hooks/firebase";

const TweetList = styled.div`
  & > * {
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.bd};
  }
`;

function tweetInsertionCallback(list, current) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].time.seconds < current.time.seconds) {
      list.splice(i, 0, current);
      return list;
    }
  }
  return list.concat(current);
}

function Home() {
  const tweets = useCollection(tweetInsertionCallback, "tweets", limit(100));

  return (
    <TweetList>
      <TweetField minRows="1" />
      {tweets.map((tweet) => (
        <Tweet key={tweet.docId} tweet={tweet} />
      ))}
    </TweetList>
  );
}

export default Home;
