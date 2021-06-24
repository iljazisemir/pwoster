import React from "react";
import { useDispatch } from "react-redux";
import Button from "../Button";
import { deleteMessage, getMessages } from "../../actions/message.actions";

const DeleteMessage = ({ message, setPopupDeleteMessage }) => {
  const dispatch = useDispatch();

  const handleDeleteMessage = async (e) => {
    e.preventDefault();

    await dispatch(
      deleteMessage(message._id, message.user1Id, message.user2Id)
    );
    dispatch(getMessages());
    setPopupDeleteMessage(false);
  };
  return (
    <>
      <div className="delete-popup">
        <div className="container-popup-delete">
          <h2>Supprimer la conversation ?</h2>
          <p>
            Il n'est pas possible d'annuler cette opération. Cette conversation
            sera supprimé de votre profil et de celui de votre ami(e).{" "}
          </p>
          <div>
            <Button
              className="button-cancel-delete"
              onClick={() => setPopupDeleteMessage(false)}
            >
              Annuler
            </Button>
            <Button
              className="button-confirm-delete"
              onClick={handleDeleteMessage}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteMessage;
