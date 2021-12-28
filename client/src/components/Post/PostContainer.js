import React, { useEffect, useState } from "react";
import "../../styles/components/Post/PostContainer.css";
import { useSelector } from "react-redux";
import { dateParserPost, isEmpty } from "../Utils";
import { Link } from "react-router-dom";
import LikePost from "./LikePost";
import RepwostPost from "./RepwostPost";
import PopupEditContainer from "./PopupEditContainer";
import { Redirect } from "react-router";

// SVG
import ThreeDots from "../../styles/assets/svg/threeDots";
import ChatSvg from "../../styles/assets/svg/chatSvg";
import QuoteTweet from "./QuoteTweet";
import CreateComment from "./CreateComment";

const PostContainer = ({ post, userPost, props }) => {
  const [popupEditPost, setPopupEditPost] = useState(false);
  const [quoteTweetTest, setQuoteTweetTest] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const postData = useSelector((state) => state.postReducer);
  const [commentPopup, setCommentPopup] = useState(false);
  const [redirectProfile, setRedirectProfile] = useState(false);
  const [redirectQuoteTweet, setRedirectQuoteTweet] = useState(false);

  useEffect(() => {
    !isEmpty(postData) &&
      postData.map((postDt) => {
        if (postDt._id === post.quoteTweetId) {
          setQuoteTweetTest(postDt._id);
        }
      });
  });

  return (
    <>
      <Link to={"/status/" + post._id} className="container-post">
        <div
          onClick={(e) => {
            setRedirectProfile(true);
            e.preventDefault();
          }}
          className="profile-picture-post-container"
        >
          <img
            src={userPost.profilePicture}
            alt="profil picture"
            className="profil-picture-post"
          />
        </div>
        <div className="container-picture-name-post">
          <span
            onClick={(e) => {
              setRedirectProfile(true);
              e.preventDefault();
            }}
            className="pseudo-tweetName-post"
          >
            {userPost.tweetName}{" "}
          </span>
          <span className="info-post">
            @{userPost.pseudo} ⸱ {dateParserPost(post.createdAt)}
          </span>
        </div>
        {userData._id === post.posterId ? (
          <div
            className="three-dots-svg-container"
            onClick={(e) => {
              setPopupEditPost(!popupEditPost);
              e.preventDefault();
            }}
          >
            <ThreeDots className="three-dots-svg " />
          </div>
        ) : (
          ""
        )}
        <div className="container-post-message">
          <div>{post.message}</div>
          {!isEmpty(post.picture) ? (
            <div>
              <img
                src={post.picture}
                alt="Photo"
                className="container-picture-post"
              />
            </div>
          ) : (
            ""
          )}
          {!isEmpty(post.quoteTweetId) && quoteTweetTest === post.quoteTweetId && (
            <div
              onClick={(e) => {
                setRedirectQuoteTweet(true);
                e.preventDefault();
              }}
              key={post.quoteTweetId}
            >
              <div className="quote-tweet-post-container">
                <QuoteTweet quoteTweetId={post.quoteTweetId} />
              </div>
            </div>
          )}
          {!isEmpty(post.quoteTweetId) &&
            quoteTweetTest !== post.quoteTweetId && (
              <div className="quote-tweet-delete-post-container">
                Ce Pwost est indisponible.
              </div>
            )}
        </div>
        <div className="svg-post">
          <div className="svg-number-container svg-number-container-conversation">
            <div className="svg-container">
              <ChatSvg
                className="svg-in-post"
                onClick={(e) => {
                  setCommentPopup(true);
                  e.preventDefault();
                }}
              />
            </div>
            {commentPopup && (
              <CreateComment
                postId={post._id}
                setCommentPopup={setCommentPopup}
              />
            )}
            <div className="number-whith-svg">
              {!isEmpty(post.comments) ? post.comments.length : " "}
            </div>
          </div>
          <div className="svg-number-container svg-number-container-retweet">
            <div className="svg-container">
              <RepwostPost
                className="svg-in-post"
                post={post}
                userPost={userPost}
              />
            </div>
            <div className="number-whith-svg">
              {!isEmpty(post.retweet) ? post.retweet.length : ""}
            </div>
          </div>
          <div className="svg-number-container svg-number-container-like">
            <div className="svg-container">
              <LikePost post={post} className="svg-in-post" />
            </div>
            <div className="number-whith-svg">
              {!isEmpty(post.likers) ? post.likers.length : ""}
            </div>
          </div>
        </div>
        {popupEditPost && (
          <PopupEditContainer
            postId={post._id}
            post={post}
            props={props}
            setPopupEditPost={setPopupEditPost}
          />
        )}
      </Link>
      {redirectProfile ? (
        <Redirect push to={"/profil/" + userPost.pseudo} />
      ) : null}
      {redirectQuoteTweet ? (
        <Redirect push to={"/status/" + post.quoteTweetId} />
      ) : null}
    </>
  );
};

export default PostContainer;
