import React, { useEffect, useState } from "react";
import "../../styles/components/Post/CreatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { editComment, editPost } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import Button from "../Button";

const EditComment = ({ post, comment, setEditPopup }) => {
  const userData = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState(comment.text);
  const dispatch = useDispatch();

  const handleEditComment = (e) => {
    e.preventDefault();
    dispatch(editComment(post._id, comment._id, message));
    setEditPopup(false);
  };

  return (
    <form className="container-create-post">
      <div className="top-container-create-post">
        <img
          src={userData.profilePicture}
          alt="picture"
          className="profil-picture-create-post"
        />
        <input
          type="text"
          name="edit-comment"
          id="edit-comment"
          autoComplete="off"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="input-create-post"
          placeholder="Quoi de neuf ?"
        />
      </div>
      <div className="bottom-container-create-post">
        <Button className="button-submit-post" onClick={handleEditComment}>
          Modifier
        </Button>
      </div>
    </form>
  );
};

export default EditComment;
