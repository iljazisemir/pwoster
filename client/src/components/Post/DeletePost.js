import React, { useState } from "react";
import "../../styles/components/Post/DeletePost.css";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import Button from "../Button";
import { Redirect } from "react-router";

const DeletePost = ({ clickToCancel, postId, props }) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  const handleDeletePost = (e) => {
    e.preventDefault();
    dispatch(deletePost(postId));
    if (props.match.url.includes("status")) setRedirect(true);
  };

  return (
    <>
      <div className="delete-popup">
        <div className="container-popup-delete">
          <h2>Supprimer le Tweet ?</h2>
          <p>
            Il n'est pas possible d'annuler cette opération. Ce Tweet sera
            supprimé de votre profil, du fil des comptes qui vous suivent et des
            résultats de recherche Twitter.{" "}
          </p>
          <div>
            <Button className="button-cancel-delete" onClick={clickToCancel}>
              Annuler
            </Button>
            <Button
              className="button-confirm-delete"
              onClick={(e) => handleDeletePost(e)}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>
      {redirect ? <Redirect push to="/" /> : null}
    </>
  );
};

export default DeletePost;
