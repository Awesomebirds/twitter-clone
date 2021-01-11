import Router from "components/Router";
import { authService } from "myFirebase";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //user is signed in
        setIsLoggedIn(true);
      } else {
        //user is not signed in
        setIsLoggedIn(false);
      }
      //loaded
      setInit(true);
    });
  }, []);

  return init ? (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>Cloned by Banana Coder | {new Date().getFullYear()}</footer>
    </>
  ) : (
    "loading..."
  );
};

export default App;
