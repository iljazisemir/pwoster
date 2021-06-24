import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import ConversationContainer from "../components/Messages/ConversationContainer";
import Button from "../components/Button";
import EnveloppeSvg from "../styles/assets/svg/enveloppeSvg";
import { isEmpty } from "../components/Utils";
import "../styles/pages/Messages.css";
import { getMessages } from "../actions/message.actions";
import { Link } from "react-router-dom";
import CreateConversation from "../components/Messages/CreateConversation";

const Messages = () => {
  const uid = useContext(UidContext);
  const messageData = useSelector((state) => state.messageReducer);
  const [popupCreateConv, setPopupCreateConv] = useState(false);
  const dispatch = useDispatch();

  let messageArrayUid = [];

  !isEmpty(messageData) && messageData.map((message) => {
    if (message.user1Id === uid || message.user2Id === uid) {
      messageArrayUid.push(message)
    }
  });

  messageArrayUid.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  // useEffect(() => {
  //   dispatch(getMessages());
  // }, [messageData]);

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
        <div className="right-messages-container">
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
        </div>
      </div>
      {popupCreateConv && (
        <CreateConversation setPopupCreateConv={setPopupCreateConv} />
      )}
    </>
  );
};

export default Messages;
