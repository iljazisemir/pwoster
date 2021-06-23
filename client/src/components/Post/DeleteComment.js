import React from "react";
import "../../styles/components/Post/DeletePost.css";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/post.actions";
import Button from "../Button";

const DeleteComment = ({ post, comment, setDeletePopup }) => {
  const dispatch = useDispatch();

  const handleDeletePost = async (e) => {
    e.preventDefault();

    await dispatch(deleteComment(post._id, comment._id));
    setDeletePopup(false);
  };

  return (
    <div className="delete-popup">
      <div className="container-popup-delete">
        <h2>Supprimer le Tweet ?</h2>
        <p>
          Il n'est pas possible d'annuler cette opération. Ce commentaire sera
          supprimé de votre profil, du fil des comptes qui vous suivent et des
          résultats de recherche Twitter.{" "}
        </p>
        <div>
          <Button
            className="button-cancel-delete"
            onClick={() => setDeletePopup(false)}
          >
            Annuler
          </Button>
          <Button className="button-confirm-delete" onClick={handleDeletePost}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComment;
