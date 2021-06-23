import React, { useState } from "react";
import GearSvg from "../../styles/assets/svg/gearSvg";
import TrashSvg from "../../styles/assets/svg/trashSvg";
import "../../styles/components/Post/PopupEditContainer.css";
import ContainerCreatePost from "./ContainerCreatePost";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

const PopupEditComment = ({ post, comment }) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  return (
    <>
      <div className="popup-container-edit">
        <button className="edit-post" onClick={() => setEditPopup(true)}>
          <GearSvg className="svg-edit-post" />
          <span className="span-post">Modifier</span>
        </button>
        <button className="delete-post" onClick={() => setDeletePopup(true)}>
          <TrashSvg className="svg-edit-post" />
          <span className="span-post">Supprimer</span>
        </button>
      </div>
      {deletePopup && (
        <DeleteComment
          setDeletePopup={setDeletePopup}
          post={post}
          comment={comment}
        />
      )}
      {editPopup && (
        <ContainerCreatePost setPopup={setEditPopup}>
          <EditComment
            post={post}
            comment={comment}
            setEditPopup={setEditPopup}
          />
        </ContainerCreatePost>
      )}
    </>
  );
};

export default PopupEditComment;
