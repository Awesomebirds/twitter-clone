import { authService, firestoreService } from "myFirebase";
import React from "react";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);

  //Form
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
      createdBy: authService.currentUser.uid,
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
        <button
          onClick={() => {
            authService.signOut();
          }}
        >
          로그아웃
        </button>
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
          <div key={tweet.id}>{tweet.text}</div>
        ))}
      </section>
    </div>
  );
};

export default Home;
