import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/components/Messages/MessagesConversation.css";
import { isEmpty, timestampParser } from "../Utils";
import { Link } from "react-router-dom";
import TrashSvg from "../../styles/assets/svg/trashSvg";
import SendMessage from "./SendMessage";
import DeleteMessage from "./DeleteMessage";

const MessagesConversation = ({ conversation }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [userRecipient, setUserRecipient] = useState("");
  const [popupDeleteMessage, setPopupDeleteMessage] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    !isEmpty(usersData) &&
      usersData.map((user) => {
        if (
          (user._id === conversation.user2Id && user._id !== userData._id) ||
          (user._id === conversation.user1Id && user._id !== userData._id)
        ) {
          setUserRecipient(user);
        }
      });
  }, [conversation]);

  return (
    <div className="right-messages-conversation-container">
      <div className="top-messages-conversation">
        <div className="top-conversation-name">
          <Link to={"/profil/" + userRecipient.pseudo}>
            <img
              src={userRecipient.profilePicture}
              alt="profil picture"
              className="profil-picture-top-conversation"
            />
          </Link>
          <div>
            <h3>{userRecipient.tweetName}</h3>
            <div className="info-post">@{userRecipient.pseudo}</div>
          </div>
        </div>
        <TrashSvg
          className="trash-svg-conversation"
          onClick={() => setPopupDeleteMessage(true)}
        />
        {popupDeleteMessage && (
          <DeleteMessage
            message={conversation}
            setPopupDeleteMessage={setPopupDeleteMessage}
          />
        )}
      </div>
      <div className="messages-right-container">
        <div className="list-messages-container">
          {!isEmpty(conversation) &&
            conversation.messages.map((message, index) => {
              if (message.senderId === userData._id) {
                return (
                  <div
                    className="message-user-date-container"
                    key={index}
                    ref={divRef}
                  >
                    <div className="message-user-container">
                      <div className="message-user">{message.text}</div>
                      <div className="date-message">
                        {timestampParser(message.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              } else if (message.senderId === userRecipient._id) {
                return (
                  <div
                    className="message-friend-date-container"
                    key={index}
                  >
                    <div className="message-friend-container">
                      <div className="picture-message-container">
                        <Link to={"/profil/" + userRecipient.pseudo}>
                          <img
                            src={userRecipient.profilePicture}
                            alt="profil picture"
                            className="profil-picture-top-conversation"
                          />
                        </Link>
                        <div>
                          <div className="message-friend">{message.text}</div>
                          <div className="date-message">
                            {timestampParser(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <SendMessage messageId={conversation._id} senderId={userData._id} />
    </div>
  );
};

export default MessagesConversation;
