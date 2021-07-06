import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import "../../styles/components/Post/CreatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import Button from "../Button";

// SVG
import ImageSvg from "../../styles/assets/svg/imageSvg";
import CrossSvg from "../../styles/assets/svg/crossSvg";
import QuoteTweet from "./QuoteTweet";
import { Link } from "react-router-dom";
import { PopupCreatePostContext } from "../AppContext";

const CreatePost = ({ quoteTweetId, setPopupQuoteTweet, popupQuoteTweet }) => {
  const userData = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState();
  const [popupCreatePost, setPopupCreatePost] = useContext(
    PopupCreatePostContext
  );
  const [file, setFile] = useState();
  const [redirectProfile, setRedirectProfile] = useState(false);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();
  

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleDeletePicture = () => {
    setPostPicture("");
    setFile("");
  };

  const handlePostTweet = async (e) => {
    e.preventDefault()
    if (message || postPicture || quoteTweetId) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (quoteTweetId && quoteTweetId !== undefined)
        data.append("quoteTweetId", quoteTweetId);
      if (file) data.append("file", file);

      await dispatch(createPost(data));
      setPopupCreatePost(false);
      if (popupQuoteTweet) setPopupQuoteTweet(false);
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  return (
    <>
    <div className="container-create-post">
      <div className="top-container-create-post">
        <div onClick={(e) => {setRedirectProfile(true); e.preventDefault()}}>
          <img
            src={userData.profilePicture}
            alt="picture"
            className="profil-picture-create-post"
          />
        </div>
        <TextareaAutosize
          type="text"
          name="message"
          id="message"
          autoComplete="off"
          maxLength="280"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="input-create-post"
          placeholder="Quoi de neuf ?"
        />
      </div>
      {!isEmpty(postPicture) ? (
        <div className="preview-picture-container">
          <div className="cross-svg-post-container" >
            <CrossSvg
              className="cross-svg-picture-post"
              onClick={handleDeletePicture}
            />
          </div>
          <img
            src={postPicture}
            alt="Photo"
            className="container-picture-create-post"
          />
        </div>
      ) : (
        ""
      )}
      {!isEmpty(quoteTweetId) && (
        <div className="quote-tweet-container">
          <QuoteTweet quoteTweetId={quoteTweetId} />
        </div>
      )}
      <div className="bottom-container-create-post">
        <div className="svg-input-container" >
          <ImageSvg className="picture-svg" />
          <input
            type="file"
            name="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            onChange={handlePicture}
            className="input-file-create-post"
          />
        </div>
        <Button
          className="button-submit-post"
          onClick={e => handlePostTweet(e)}
        >
          Pwoster
        </Button>
      </div>
    </div>
    {redirectProfile ? (
        <Redirect push to={"/profil/" + userData.pseudo} />
      ) : null}
    </>
  );
};

export default CreatePost;
