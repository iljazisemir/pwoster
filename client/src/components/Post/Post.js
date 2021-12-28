import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowLeftSvg from "../../styles/assets/svg/arrowLeftSvg";
import ChatSvg from "../../styles/assets/svg/chatSvg";
import RetweetSvg from "../../styles/assets/svg/retweetSvg";
import ThreeDots from "../../styles/assets/svg/threeDots";
import "../../styles/components/Post/Post.css";
import { PopupCreatePostContext, UidContext } from "../AppContext";
import FollowPopup from "../Profil/FollowPopup";
import { dateParserPostLong, isEmpty } from "../Utils";
import Comments from "./Comments";
import ContainerCreatePost from "./ContainerCreatePost";
import CreateComment from "./CreateComment";
import LikePost from "./LikePost";
import PopupEditContainer from "./PopupEditContainer";
import QuoteTweet from "./QuoteTweet";
import RepwostPost from "./RepwostPost";

const Post = ({ postId, ...props }) => {
  const uid = useContext(UidContext);
  const [popupEditPost, setPopupEditPost] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const postData = useSelector((state) => state.postReducer);
  const [post, setPost] = useState("");
  const [userPost, setUserPost] = useState("");
  const [retweetListPopup, setRetweetListPopup] = useState(false);
  const [likeListPopup, setLikeListPopup] = useState(false);
  const [commentPopup, setCommentPopup] = useState(false);
  const [quoteTweetTest, setQuoteTweetTest] = useState("");
  const [popupCreatePost, setPopupCreatePost] = useContext(
    PopupCreatePostContext
  );

  useEffect(() => {
    !isEmpty(postData) &&
      postData.map((postDt) => {
        if (postDt._id === postId) {
          setPost(postDt);
        }
        if (postDt._id === post.quoteTweetId) {
          setQuoteTweetTest(postDt._id);
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
      <div className="top-post-container">
        <Link to="/">
          <ArrowLeftSvg className="left-arrow-svg" />
        </Link>
        <h3>Discussion</h3>
      </div>
      <div className="container-post-status">
        <div className="top-post-status">
          <div className="top-left-status">
            <Link
              to={"/profil/" + userPost.pseudo}
              className="profile-picture-post-container"
            >
              <img
                src={userPost.profilePicture}
                alt="profil picture"
                className="profil-picture-post"
              />
            </Link>
            <div className="pseudo-status-container">
              <div className="container-picture-name-post">
                <Link
                  to={"/profil/" + userPost.pseudo}
                  className="pseudo-tweetName-post"
                >
                  {userPost.tweetName}{" "}
                </Link>
              </div>
              <span className="info-post">@{userPost.pseudo}</span>
            </div>
          </div>
          {userData._id === post.posterId ? (
            <div className="three-dots-svg-container">
              <ThreeDots
                className="three-dots-svg "
                onClick={() => setPopupEditPost(!popupEditPost)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {popupEditPost && (
          <PopupEditContainer postId={post._id} post={post} props={props} setPopupEditPost={setPopupEditPost}/>
        )}
        <div className="container-post-message">
          <div>{post.message}</div>
          {!isEmpty(post.picture) || post.video ? (
            <div>
              <img
                src={post.picture}
                alt="Photo"
                className="container-picture-post-status"
              />
            </div>
          ) : (
            ""
          )}
          {!isEmpty(post.quoteTweetId) && quoteTweetTest === post.quoteTweetId && (
            <Link to={"/status/" + post.quoteTweetId} key={post.quoteTweetId}>
              <div className="quote-tweet-post">
                <QuoteTweet quoteTweetId={post.quoteTweetId} />
              </div>
            </Link>
          )}
          {!isEmpty(post.quoteTweetId) &&
            quoteTweetTest !== post.quoteTweetId && (
              <div className="quote-tweet-delete-post">
                Ce Pwost est indisponible.
              </div>
            )}
        </div>
        <span className="date-post-status">
          {dateParserPostLong(post.createdAt)} · Pwost Web App
        </span>
        <div className="separator-post-status"></div>
        <div className="list-like-retweet">
          <b>{!isEmpty(post.retweet) ? post.retweet.length : 0}</b>
          <span
            className="list-post-status"
            onClick={() => setRetweetListPopup(true)}
          >
            Repwost
          </span>
          <b>{!isEmpty(post.likers) ? post.likers.length : 0}</b>
          <span
            className="list-post-status"
            onClick={() => setLikeListPopup(true)}
          >
            J'aime
          </span>
        </div>
        {retweetListPopup && (
          <FollowPopup
            uid={uid}
            userFollowId={post.retweet}
            setFollowPopup={() => setRetweetListPopup(false)}
          >
            Repwosté par
          </FollowPopup>
        )}
        {likeListPopup && (
          <FollowPopup
            uid={uid}
            userFollowId={post.likers}
            setFollowPopup={() => setLikeListPopup(false)}
          >
            Aimé par
          </FollowPopup>
        )}
        <div className="separator-post-status"></div>
        <div className="svg-post">
          <div className="svg-number-container svg-number-container-chat">
            <div className="svg-container">
              <ChatSvg
                className="svg-in-post"
                onClick={() => setCommentPopup(true)}
              />
              {commentPopup && (
                <CreateComment
                  postId={post._id}
                  setCommentPopup={setCommentPopup}
                />
              )}
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
          </div>
          <div className="svg-number-container svg-number-container-like">
            <div className="svg-container">
              <LikePost post={post} className="svg-in-post" />
            </div>
          </div>
        </div>
      </div>
      {!isEmpty(post.comments) &&
        post.comments.map((comment) => {
          return <Comments comment={comment} post={post} key={comment._id} />;
        })}
    </>
  );
};

export default Post;
