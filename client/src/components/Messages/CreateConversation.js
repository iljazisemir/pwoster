import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { createMessage, getMessages } from "../../actions/message.actions";
import CrossSvg from "../../styles/assets/svg/crossSvg";
import "../../styles/components/Messages/CreateConversation.css";
import { isEmpty } from "../Utils";

const CreateConversation = ({ setPopupCreateConv }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const messageData = useSelector((state) => state.messageReducer);
  const [messageIdRedirect, setMessageIdRedirect] = useState("");
  const [redirectConv, setRedirectConv] = useState(false);
  const dispatch = useDispatch();

  const handleCreateMessage = async (userConnected, userData) => {
    let user1Id = "";
    let user2Id = "";
    let cptNo = 0;
    !isEmpty(messageData) &&
    !isEmpty(userConnected.conversations) &&
    !isEmpty(userData.conversations)
      ? messageData.map((message) => {
          if (
            (userConnected._id === message.user1Id ||
              userConnected._id === message.user2Id) &&
            (userData._id === message.user1Id ||
              userData._id === message.user2Id)
          ) {
            setMessageIdRedirect(message._id);
            cptNo++;
          } else {
            user1Id = userConnected._id;
            user2Id = userData._id;
          }
        })
      : (user1Id = userConnected._id) && (user2Id = userData._id);

    if (cptNo === 0) {
      await dispatch(createMessage(user1Id, user2Id));
      await dispatch(getMessages());
      let newMessageId = "";
      !isEmpty(messageData) &&
        messageData.map((message) => {
          if (
            (user1Id === message.user1Id || user1Id === message.user2Id) &&
            (user2Id === message.user1Id || user2Id === message.user2Id)
          ) {
            newMessageId = message._id;
          }
        });
      await setMessageIdRedirect(newMessageId);
      // window.location.href = "/messages/" + messageIdRedirect;
      setPopupCreateConv(false);
      // setRedirect(true);
    } else {
      // await setRedirect(true);
      setPopupCreateConv(false);
    }
  };

  return (
    <>
      <div className="popup-container-create-conv ">
        <div className="create-conv-popup">
          <div className="top-popup-create-conv">
            <h3 className="title-popup">Nouveau message</h3>
            <CrossSvg
              className="cross-create-conv-popup"
              onClick={() => setPopupCreateConv(false)}
            />
          </div>
          <div className="middle-popup-create-conv">
            {!isEmpty(usersData) &&
              usersData.map((user) => {
                if (user._id !== userData._id) {
                  //   userData.conversations.map((convUserId) => {
                  //     user.conversations.map((convId) => {
                  //       if (convUserId !== convId) {
                  return (
                    <div
                      className="user-create-conv-container"
                      key={user._id}
                      onClick={() => handleCreateMessage(user, userData)}
                    >
                      <div className="info-follow ">
                        <div className="profile-picture-follow-container">
                          <img
                            src={user.profilePicture}
                            alt="Photo de profil"
                            className="profile-picture-follow"
                          />
                        </div>
                        <div className="pseudo-tweetname-follow">
                          <div className="tweetName">{user.tweetName}</div>
                          <div className="userName">@{user.pseudo}</div>
                        </div>
                      </div>
                    </div>
                  );
                  //       }
                  //     });
                  //   });
                }
              })}
          </div>
        </div>
      </div>
      {redirectConv ? (
        <Redirect push to={"/messages/" + messageIdRedirect} />
      ) : null}
    </>
  );
};

export default CreateConversation;
