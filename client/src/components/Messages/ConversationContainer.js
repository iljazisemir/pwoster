import React, { useEffect, useState } from "react";
import "../../styles/components/Messages/ConversationContainer.css";
import { useSelector } from "react-redux";
import { isEmpty, dateParserShort } from "../Utils";

const ConversationContainer = ({ conversation }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [userRecipient, setUserRecipient] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    !isEmpty(usersData) &&
      usersData.map((user) => {
        if (
          (user._id === conversation.user1Id && user._id !== userData._id) ||
          (user._id === conversation.user2Id && user._id !== userData._id)
        ) {
          setUserRecipient(user);
        }
      });

    conversation.messages.map((message) => {
      if (message) {
        setLastMessage(message);
      }
    });
  }, [userRecipient, lastMessage, conversation]);

  return (
    <div className="conversation-container">
      <img
        src={userRecipient.profilePicture}
        alt="profil picture"
        className="profil-picture-post-conversation"
      />
      <div className="name-preview-conversation-container">
        <div className="pseudo-name-conversation-container">
          <div className="tweetName">{userRecipient.tweetName}</div>
          <div className="info-post">@{userRecipient.pseudo}</div>
        </div>
        <div className="preview-message">{lastMessage.text}</div>
      </div>
      <div className="date-last-message">
        {dateParserShort(conversation.updatedAt)}
      </div>
    </div>
  );
};

export default ConversationContainer;
