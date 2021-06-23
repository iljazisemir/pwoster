import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/components/Post/QuoteTweet.css";
import { dateParserPost, isEmpty } from "../Utils";

const QuoteTweet = ({ quoteTweetId }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const postData = useSelector((state) => state.postReducer);
  const [post, setPost] = useState("");
  const [userPost, setUserPost] = useState("");

  useEffect(() => {
    !isEmpty(postData) &&
      postData.map((postDt) => {
        if (postDt._id === quoteTweetId) {
          setPost(postDt);
        }
      });

    !isEmpty(usersData) &&
      usersData.map((user) => {
        if (user._id === post.posterId) {
          setUserPost(user);
        }
      }, []);
  });

  return (
    <>
      <div className="container-quote">
        <div className="top-quote-container">
          <img
            src={userPost.profilePicture}
            className="profile-picture-quote"
            alt="profile picture"
          />
          <span className="tweetName">{userPost.tweetName}</span>
          <div className="space-quote"></div>
          <span className="info-post">
            @{userPost.pseudo} ⸱ {dateParserPost(post.createdAt)}
          </span>
        </div>
        <div className="tweet-message-quote">{post.message}</div>
      </div>
      <div>
        {!isEmpty(post.picture) ? (
          <div>
            <img
              src={post.picture}
              alt="Photo"
              className="container-picture-post-quote"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default QuoteTweet;
