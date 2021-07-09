import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import "../../styles/components/Post/CreatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import Button from "../Button";

// SVG
import CrossSvg from "../../styles/assets/svg/crossSvg";

const CreateComment = ({ postId, setCommentPopup }) => {
  const userData = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");
  const [postIdRedirect, setPostIdRedirect] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const handlePostComment = async (e) => {
    e.preventDefault();

    if (message) {
      await dispatch(
        createComment(postId, userData._id, userData.pseudo, message)
      );
      dispatch(getPosts());
      setPostIdRedirect(postId)
      setRedirect(true)
      setCommentPopup(false)
    } else {
      alert("Veuillez entrer un message");
    }
  };

  return (
    <>
    <div className="popup-create-post" onClick={(e) => e.preventDefault()}>
      <div className="popup-create-post-container">
        <div className="top-container-popup-create">
          <CrossSvg
            className="cross-popup-update"
            onClick={() => setCommentPopup(false)}
          />
          <h4>Laisser un commentaire</h4>
        </div>
        <div className="main-create-post-container">
          <form className="container-create-post">
            <div className="top-container-create-post">
              <img
                src={userData.profilePicture}
                alt="picture"
                className="profil-picture-create-post"
              />
              <TextareaAutosize
                type="text"
                name="comment"
                id="comment"
                autoComplete="off"
                maxLength="280"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="input-create-post"
                placeholder="Quoi de neuf ?"
              />
            </div>
            <div className="bottom-container-create-post">
              <Button
                className="button-submit-post"
                onClick={handlePostComment}
              >
                Pwoster
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
          {redirect ? (
            <Redirect push to={"/status/" + postIdRedirect} />
          ) : null}
          </>
  );
};

export default CreateComment;
