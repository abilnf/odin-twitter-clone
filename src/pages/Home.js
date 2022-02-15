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

function Home() {
  const tweets = useCollection("tweets", limit(100));

  // console.log(tweets);

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
