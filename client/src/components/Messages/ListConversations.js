import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/Messages/ListConversation.css";
import { UidContext } from "../AppContext";
import { isEmpty } from "../Utils";
import { Link } from "react-router-dom";
import EnveloppeSvg from "../../styles/assets/svg/enveloppeSvg";
import ConversationContainer from "./ConversationContainer";
import MessagesConversation from "./MessagesConversation";
import { getMessages } from "../../actions/message.actions";
import Button from "../Button";

const ListConversation = ({ setPopupCreateConv, openConv, idMessage }) => {
  const uid = useContext(UidContext);
  const messageData = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();
  let messageArrayUid = [];

  useEffect(() => {
    dispatch(getMessages());
  }, [messageData]);

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
    <div className="left-messages-container">
      <div className="top-list-conversation-container">
        <h3>Messages</h3>
        <EnveloppeSvg
          className="new-message-svg"
          onClick={() => setPopupCreateConv(true)}
        />
      </div>
      <div className="space-message-left"></div>
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
      <div className="container-conversation-responsive">
        {!openConv ? (
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
        ) : (
          !isEmpty(messageData) &&
          messageData.map((message) => {
            if (message._id === idMessage) {
              return (
                <MessagesConversation
                  conversation={message}
                  key={message._id}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default ListConversation;
