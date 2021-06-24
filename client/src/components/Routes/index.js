import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import MainContainer from "../MainContainer";
import TrendingContainer from "../TrendingContainer";
import Navbar from "../Navbar";
import Post from "../Post/Post";
import AllSuggestions from "../AllSuggestions";
import Messages from "../../pages/Messages";
import MessagesAndConversation from "../Messages/MessageAndConversation";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <>
          <Navbar />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MainContainer>
              <Route path="/" exact render={(props) => <Home {...props} />} />
              <Route
                path="/profil/:pseudo"
                exact
                render={(props) => (
                  <Profil userPseudo={props.match.params.pseudo} {...props} />
                )}
              />
              <Route
                path="/status/:postId"
                exact
                render={(props) => (
                  <Post postId={props.match.params.postId} {...props} />
                )}
              />
              <Route path="/suggestions" exact component={AllSuggestions} />
              <Route path="/trending" exact component={Trending} />
              <Route path="/messages" exact component={Messages} />
              <Route
                path="/messages/:idMessage"
                exact
                render={(props) => (
                  <MessagesAndConversation
                    idMessage={props.match.params.idMessage}
                    {...props}
                  />
                )}
              />
              <div className="page-bottom"></div>
            </MainContainer>
          </div>
          <TrendingContainer />
        </>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
