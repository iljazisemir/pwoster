import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationContainer from "./ConversationContainer";
// import Button from "../components/Button";
import "../../styles/pages/Messages.css";
import { UidContext } from "../AppContext";
import MessagesConversation from "./MessagesConversation";
import { isEmpty } from "../Utils";
import EnveloppeSvg from "../../styles/assets/svg/enveloppeSvg";
import { Link } from "react-router-dom";
import CreateConversation from "./CreateConversation";
import { getMessages } from "../../actions/message.actions";

const MessagesAndConversation = ({ ...props }) => {
  const uid = useContext(UidContext);
  const messageData = useSelector((state) => state.messageReducer);
  const [popupCreateConv, setPopupCreateConv] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMessages());
  // }, [messageData]);

  let messageArrayUid = [];

  !isEmpty(messageData) &&
    messageData.map((message) => {
      if (message.user1Id === uid || message.user2Id === uid) {
        messageArrayUid.push(message);
      }
    });

  messageArrayUid.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <>
      <div className="page-message">
        <div className="left-messages-container">
          <div className="top-list-conversation-container">
            <h3>Messages</h3>
            <EnveloppeSvg
              className="new-message-svg"
              onClick={() => setPopupCreateConv(true)}
            />
          </div>
          <div className="list-conversation-container">
            {!isEmpty(messageData) &&
              messageArrayUid.map((message) => {
                if (message.user1Id === uid || message.user2Id === uid) {
                  return (
                    <Link to={"/messages/" + message._id} key={message._id}>
                      <ConversationContainer conversation={message} />
                    </Link>
                  );
                }
              })}
          </div>
        </div>
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
      </div>
      {popupCreateConv && (
        <CreateConversation setPopupCreateConv={setPopupCreateConv} />
      )}
    </>
  );
};

export default MessagesAndConversation;
