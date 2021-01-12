import { firestoreService } from "myFirebase";
import { useState } from "react";

const Tweet = ({ isCreator, id, text }) => {
  const [newTweet, setNewTweet] = useState(text);
  const [editing, setEditing] = useState(false);

  //Tweet 지우기
  const deleteTweet = async (id) => {
    await firestoreService.collection("tweets").doc(id).delete();
  };

  //Tweet 편집하기
  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleChange = (event) => {
    setNewTweet(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toggleEdit();
    await firestoreService.collection("tweets").doc(id).update({
      text: newTweet,
      updatedAt: Date.now(),
    });
  };

  return (
    <div key={id}>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTweet}
            placeholder="edit tweet"
            onChange={handleChange}
          />
          <input type="submit" value="edit" />
        </form>
      ) : (
        <div>{text}</div>
      )}
      {isCreator && (
        <div>
          <button onClick={() => deleteTweet(id)}>❌</button>
          <button onClick={() => toggleEdit()}>🔧</button>
        </div>
      )}
    </div>
  );
};

export default Tweet;
