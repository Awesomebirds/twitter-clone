import Router from "components/Router";
import { authService } from "myFirebase";
import { useState, useEffect } from "react";

const App = () => {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //user is signed in
        setUser(user.uid);
      } else {
        //user is not signed in
        setUser(null);
      }
      //loaded
      setInit(true);
    });
  }, []);

  return init ? (
    <>
      <Router user={user} />
      <footer>Cloned by Banana Coder | {new Date().getFullYear()}</footer>
    </>
  ) : (
    "loading..."
  );
};

export default App;
