import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/pages/Messages.css";
import { UidContext } from "../AppContext";
import MessagesConversation from "./MessagesConversation";
import { isEmpty } from "../Utils";
import CreateConversation from "./CreateConversation";
import { getMessages } from "../../actions/message.actions";
import ListConversation from "./ListConversations";
import RightContainerMessage from "./RightContainerMessage";

const MessagesAndConversation = ({ ...props }) => {
  const messageData = useSelector((state) => state.messageReducer);
  const [popupCreateConv, setPopupCreateConv] = useState(false);
  const [openConv, setOpenConv] = useState(true)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMessages());
  // }, [messageData]);

  return (
    <>
      <div className="page-message">
        <ListConversation setPopupCreateConv={setPopupCreateConv} openConv={openConv} idMessage={props.idMessage}/>
        <RightContainerMessage>
        {!isEmpty(messageData) &&
          messageData.map((message) => {
            if (message._id === props.idMessage) {
              return (
                <MessagesConversation
                  conversation={message}
                  key={message._id}
                />
              );
            }
          })}
        </RightContainerMessage>
      </div>
      {popupCreateConv && (
        <CreateConversation setPopupCreateConv={setPopupCreateConv} />
      )}
    </>
  );
};

export default MessagesAndConversation;
