import React, { useState } from "react";
import "../../styles/components/Profil/TabTweet.css";
import PostContainer from "../Post/PostContainer";
import { isEmpty } from "../Utils";

const TabTweet = ({ userData, usersData, postData, props }) => {
  const [tweetsView, setTweetsView] = useState(true);
  const [tweetsResponsesView, setTweetsResponsesView] = useState(false);
  const [mediaView, setMediaView] = useState(false);
  const [likesView, setLikesView] = useState(false);

  const handleTabTweetsView = () => {
    setTweetsView(true);
    setTweetsResponsesView(false);
    setMediaView(false);
    setLikesView(false);
  };

  const handleTabTweetsResponsesView = () => {
    setTweetsView(false);
    setTweetsResponsesView(true);
    setMediaView(false);
    setLikesView(false);
  };

  const handleTabMediaView = () => {
    setTweetsView(false);
    setTweetsResponsesView(false);
    setMediaView(true);
    setLikesView(false);
  };

  const handleTabLikesView = () => {
    setTweetsView(false);
    setTweetsResponsesView(false);
    setMediaView(false);
    setLikesView(true);
  };

  return (
    <>
      <div className="tab-container">
        <div
          id="tab-tweets"
          className={`tab-title ${
            tweetsView ? "active-container-profil" : null
          }`}
          onClick={handleTabTweetsView}
        >
          <h4>Tweets</h4>
        </div>
        <div
          id="tab-responses"
          className={`tab-title ${
            tweetsResponsesView ? "active-container-profil" : null
          }`}
          onClick={handleTabTweetsResponsesView}
        >
          <h4 className="container-response-tweet">Tweets et réponses</h4>
        </div>
        <div
          id="tab-profil"
          className={`tab-title ${
            mediaView ? "active-container-profil" : null
          }`}
          onClick={handleTabMediaView}
        >
          <h4>Médias</h4>
        </div>
        <div
          id="tab-profil"
          className={`tab-title ${
            likesView ? "active-container-profil" : null
          }`}
          onClick={handleTabLikesView}
        >
          <h4>J'aime</h4>
        </div>
      </div>
      {!isEmpty(postData[0]) &&
        tweetsView &&
        postData.map((post) => {
          if (post.posterId === userData._id) {
            return (
              <PostContainer
                post={post}
                userPost={userData}
                props={props}
                key={post._id}
              />
            );
          } else {
            return null;
          }
        })}
      {!isEmpty(postData[0]) &&
        tweetsResponsesView &&
        postData.map((post) => {
          if (
            post.posterId === userData._id ||
            post.retweet.includes(userData._id)
          ) {
            let userPostData = "";
            usersData.map((user) => {
              if (user._id === post.posterId) {
                userPostData = user;
              }
            });
            return (
              <PostContainer
                post={post}
                userPost={userPostData}
                props={props}
                key={post._id}
              />
            );
          } else {
            return null;
          }
        })}
      {!isEmpty(postData[0]) &&
        mediaView &&
        postData.map((post) => {
          if (post.posterId === userData._id) {
            if (post.picture || post.video) {
              return (
                <PostContainer
                  post={post}
                  userPost={userData}
                  props={props}
                  key={post._id}
                />
              );
            }
          } else {
            return null;
          }
        })}
      {!isEmpty(postData[0]) &&
        likesView &&
        postData.map((post) => {
          for (let i = 0; i < post.likers.length; i++) {
            if (post.likers[i] === userData._id) {
              let userPostData = "";
              usersData.map((userPost) => {
                if (userPost._id === post.posterId) {
                  userPostData = userPost;
                }
              });
              return (
                <PostContainer
                  post={post}
                  userPost={userPostData}
                  props={props}
                  key={post._id}
                />
              );
            }
          }
        })}
    </>
  );
};

export default TabTweet;
