import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "routers/Auth";
import Home from "routers/Home";
import Profile from "routers/Profile";
import EditProfile from "routers/EditProfile";

const RouterComponent = ({ user }) => {
  return (
    <Router>
      <Switch>
        {user ? (
          <>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/editprofile">
              <EditProfile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default RouterComponent;
