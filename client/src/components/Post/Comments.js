import React, { useState } from "react";
import "../../styles/components/Post/PostContainer.css";
import { useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { Link } from "react-router-dom";
import PopupEditComment from "./PopupEditComment";

// SVG
import ThreeDots from "../../styles/assets/svg/threeDots";

const Comments = ({ comment, post }) => {
  const [popupEditComment, setPopupEditComment] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  let userComment = "";

  !isEmpty(usersData) &&
    usersData.map((user) => {
      if (user._id === comment.commenterId) {
        userComment = user;
      }
    });

  return (
    <>
      <div className="container-post">
        <Link
          to={"/profil/" + userComment.pseudo}
          className="profile-picture-post-container"
        >
          <img
            src={userComment.profilePicture}
            alt="profil picture"
            className="profil-picture-post"
          />
        </Link>
        <div className="container-picture-name-post">
          <Link
            to={"/profil/" + userComment.pseudo}
            className="pseudo-tweetName-post"
          >
            {userComment.tweetName}{" "}
          </Link>
          <span className="info-post">
            @{userComment.pseudo} ⸱ {timestampParser(comment.timestamp)}
          </span>
        </div>
        {userData._id === comment.commenterId ? (
          <div className="three-dots-svg-container">
            <ThreeDots
              className="three-dots-svg "
              onClick={() => setPopupEditComment(!popupEditComment)}
            />
          </div>
        ) : (
          ""
        )}
        {popupEditComment && <PopupEditComment post={post} comment={comment} setPopupEditComment={setPopupEditComment}/>}
        <div className="container-post-message">
          <div>{comment.text}</div>
        </div>
      </div>
    </>
  );
};

export default Comments;
