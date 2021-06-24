import React, { useState } from "react";
import GearSvg from "../../styles/assets/svg/gearSvg";
import TrashSvg from "../../styles/assets/svg/trashSvg";
import "../../styles/components/Post/PopupEditContainer.css";
import ContainerCreatePost from "./ContainerCreatePost";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const PopupEditContainer = ({ postId, post, props, setPopupEditPost }) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  return (
    <>
      <div className="popup-container-edit">
        <button
          className="edit-post"
          onClick={(e) => {
            setEditPopup(true);
            e.preventDefault();
          }}
        >
          <GearSvg className="svg-edit-post" />
          <span className="span-post">Modifier</span>
        </button>
        <button
          className="delete-post"
          onClick={(e) => {
            setDeletePopup(true);
            e.preventDefault();
          }}
        >
          <TrashSvg className="svg-edit-post" />
          <span className="span-post">Supprimer</span>
        </button>
      </div>
      {deletePopup && (
        <DeletePost
          clickToCancel={() => setDeletePopup(false)}
          postId={postId}
          props={props}
        />
      )}
      {editPopup && (
          <EditPost post={post} clickToCancel={() => setEditPopup()}/>
      )}
    </>
  );
};

export default PopupEditContainer;
