import React from "react";
import { useState, useEffect } from "react";
import { firestoreService } from "myFirebase";
import Header from "components/Header";
import Tweet from "components/Tweet";

const Home = ({ user }) => {
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);

  //Tweet 만들기
  //Input
  const handleChange = (event) => {
    setTweet(event.target.value);
  };

  //Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    //데이터베이스에 등록
    await firestoreService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      createdBy: user,
    });

    //내용 비우기
    setTweet("");
  };

  //Tweet 가져오기
  const getTweets = (snap) => {
    const tweetArray = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTweetList(tweetArray);
  };

  //Effect
  useEffect(() => {
    //리얼타임 리스너 등록
    firestoreService.collection("tweets").onSnapshot((snap) => getTweets(snap));
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tweet}
          onChange={handleChange}
          placeholder="what's on your mind?"
        />
        <input type="submit" value="tweet" />
      </form>
      <section>
        {tweetList.map((tweet) => (
          <Tweet
            key={tweet.id}
            isCreator={user === tweet.createdBy}
            id={tweet.id}
            text={tweet.text}
            createdBy={tweet.createdBy}
            createdAt={tweet.createdAt}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
