import React, { useEffect, useState } from "react";
import "../../styles/components/Post/CreatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import Button from "../Button";

// SVG
import ImageSvg from "../../styles/assets/svg/imageSvg";
import CrossSvg from "../../styles/assets/svg/crossSvg";

const EditPost = ({ post, clickToCancel }) => {
  const userData = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState(post.message);
  const [postPicture, setPostPicture] = useState(post.picture);
  const [file, setFile] = useState(post.picture);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  // const handlePicture = (e) => {
  //   setPostPicture(URL.createObjectURL(e.target.files[0]));
  //   setFile(e.target.files[0]);
  // };

  const handleDeletePicture = () => {
    setPostPicture("");
    setFile("");
  };

  const handleEditTweet = () => {
    dispatch(editPost(post._id, message, file));
    clickToCancel(false)
  };

  return (
    <div className="popup-create-post" onClick={e => e.preventDefault()}>
    <div className="popup-create-post-container">
      <div className="top-container-popup-create">
        <CrossSvg className="cross-popup-update" onClick={() => clickToCancel(false)} />
      </div>
      <div className="main-create-post-container">
    <form className="container-create-post" >
      <div className="top-container-create-post">
        <img
          src={userData.profilePicture}
          alt="picture"
          className="profil-picture-create-post"
        />
        <input
          type="text"
          name="edit-post"
          id="edit-post"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="input-create-post"
          placeholder="Quoi de neuf ?"
        />
      </div>
      {!isEmpty(postPicture) ? (
        <div className="preview-picture-container">
          {/* <div className="cross-svg-post-container">
            <CrossSvg
              className="cross-svg-picture-post"
              onClick={handleDeletePicture}
            />
          </div> */}
          <img
            src={postPicture}
            alt="Photo"
            className="container-picture-create-post"
          />
        </div>
      ) : (
        ""
      )}
      <div className="bottom-container-create-post">
        {/* <div className="svg-input-container">
          <ImageSvg className="picture-svg" />
          <input
            type="file"
            name="file"
            id="file"
            autoComplete="off"
            accept=".jpg, .jpeg, .png"
            onChange={handlePicture}
            className="input-file-create-post"
          />
        </div> */}
        <Button
          className="button-submit-post"
          onClick={handleEditTweet}
        >
          Modifier
        </Button>
      </div>
    </form>
    </div>
      </div>
    </div>
  );
};

export default EditPost;
