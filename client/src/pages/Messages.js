import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import "../styles/pages/Messages.css";
import { getMessages } from "../actions/message.actions";
import CreateConversation from "../components/Messages/CreateConversation";
import ListConversation from "../components/Messages/ListConversations";
import RightContainerMessage from "../components/Messages/RightContainerMessage";

const Messages = ({idMessage, ...props}) => {
  const messageData = useSelector((state) => state.messageReducer);
  const [popupCreateConv, setPopupCreateConv] = useState(false);
  const [openConv, setOpenConv] = useState(false)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMessages());
  // }, [messageData]);

  return (
    <>
      <div className="page-message">
        <ListConversation setPopupCreateConv={setPopupCreateConv} openConv={openConv}/>
        <RightContainerMessage>
        <div className="middle-message-container">
          <h3>Aucun message n'est sélectionné</h3>
          <div className="info-post">
            Choisissez-en un dans vos messages existants, ou commencez-en un
            nouveau.
          </div>
          <Button
            className="button-new-message"
            onClick={() => setPopupCreateConv(true)}
          >
            Nouveau message
          </Button>
        </div>
        </RightContainerMessage>
      </div>
      {popupCreateConv && (
        <CreateConversation setPopupCreateConv={setPopupCreateConv} />
      )}
    </>
  );
};

export default Messages;
