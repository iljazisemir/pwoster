import React, { useContext, useEffect, useState } from "react";
import "../../styles/components/Profil/ProfilContainer.css";
import { Link, Redirect } from "react-router-dom";
import { dateParser, isEmpty } from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import UpdatePopup from "./UpdatePopup";
import FollowPopup from "./FollowPopup";
import { createMessage, getMessages } from "../../actions/message.actions";
import { getUsers } from "../../actions/users.actions";

// SVG
import ArrowLeftSvg from "../../styles/assets/svg/arrowLeftSvg";
import CrossSvg from "../../styles/assets/svg/crossSvg";
import CalendarSvg from "../../styles/assets/svg/calendarSvg";
import ButtonFollow from "./ButtonFollow";
import EnveloppeSvg from "../../styles/assets/svg/enveloppeSvg";

const ProfilContainer = ({ userData, postData }) => {
  const userConnected = useSelector((state) => state.userReducer);
  const [coverPicturePopup, setCoverPicturePopup] = useState(false);
  const [profilePicturePopup, setProfilePicturePopup] = useState(false);
  const [popupUpdate, setPopupUpdate] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const [messageIdRedirect, setMessageIdRedirect] = useState("");
  const [redirectConv, setRedirectConv] = useState(false);
  const messageData = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();

  const userPostLength = (postData, userData) => {
    let postUser = 0;
    for (let i = 0; i < postData.length; i++) {
      if (postData[i].posterId === userData._id) postUser++;
    }
    return postUser;
  };

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
            setRedirectConv(true)
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
      window.location.href = "/messages/" + messageIdRedirect;
      setRedirectConv(true);
    } else {
      setRedirectConv(true);
    }
  };

  return (
    <>
      <div className="top-container">
        <Link to="/">
          <ArrowLeftSvg className="left-arrow-svg" />
        </Link>
        <div>
          <div className="tweetName-profil">{userData.tweetName}</div>
          <div className="tweets-number">
            {userPostLength(postData, userData)} Tweet
            {userPostLength(postData, userData) > 1 ? "s" : ""}
          </div>
        </div>
      </div>
      <div className="cover-picture-container">
        <img
          src={userData.coverPicture}
          alt="Photo de couverture"
          className="cover-picture"
          onClick={() => setCoverPicturePopup(true)}
        />
      </div>
      {coverPicturePopup && (
        <div className="popup-container">
          <CrossSvg
            className="cross-popup"
            onClick={() => setCoverPicturePopup(false)}
          />
          <img
            src={userData.coverPicture}
            alt="Photo de couverture"
            className="cover-picture-popup"
          />
        </div>
      )}
      <div className="profile-picture-container">
        <img
          src={userData.profilePicture}
          alt="Photo de profil"
          className="profile-picture"
          onClick={() => setProfilePicturePopup(true)}
        />
      </div>
      {profilePicturePopup && (
        <div className="popup-container">
          <CrossSvg
            className="cross-popup"
            onClick={() => setProfilePicturePopup(false)}
          />
          <img
            src={userData.profilePicture}
            alt="Photo de profil"
            className="profile-picture-popup"
          />
        </div>
      )}
      <div className="container-profil">
        {userData._id === userConnected._id ? (
          <Button
            className="button-update-profil"
            onClick={() => setPopupUpdate(true)}
          >
            Éditer le profil
          </Button>
        ) : (
          <div className="container-msg-follow">
              <div
                className="container-send-message-profil"
                onClick={() => handleCreateMessage(userConnected, userData)}
              >
                <EnveloppeSvg className="enveloppe-svp-send-profil" />
              </div>
            <ButtonFollow
              className="button-follow-profil"
              idToFollow={userData._id}
            />
          </div>
        )}
        {popupUpdate && (
          <UpdatePopup
            popupClose={popupUpdate}
            setPopupUpdate={setPopupUpdate}
          />
        )}
        <div className="top-container-profil"></div>
        <div className="profil-info">
          <div className="tweetName-info-container">{userData.tweetName}</div>
          <div className="pseudo-info-container">@{userData.pseudo}</div>
          {userData.bio ? (
            <div className="bio-info-container">{userData.bio}</div>
          ) : (
            ""
          )}
          <div className="date-info-container">
            <CalendarSvg className="calendar-svg" />
            <span className="date-info">
              A rejoint Pwost en {dateParser(userData.createdAt)}
            </span>
          </div>
          <div className="sub-info-container">
            <div className="sub-info" onClick={() => setFollowingPopup(true)}>
              <b>{userData.following ? userData.following.length : ""}</b>
              <span style={{ color: "#5b7083" }}>
                {" "}
                abonnement
                {userData.following && userData.following.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="sub-info" onClick={() => setFollowersPopup(true)}>
              <b>{userData.followers ? userData.followers.length : ""}</b>
              <span style={{ color: "#5b7083" }}>
                {" "}
                abonné
                {userData.followers && userData.followers.length > 1 ? "s" : ""}
              </span>
            </div>
            {followingPopup && (
              <FollowPopup
                userFollowId={userData.following}
                uid={userConnected._id}
                setFollowPopup={setFollowingPopup}
              >
                Abonnement
                {userData.following && userData.following.length > 1 ? "s" : ""}
              </FollowPopup>
            )}
            {followersPopup && (
              <FollowPopup
                uid={userConnected._id}
                userFollowId={userData.followers}
                setFollowPopup={setFollowersPopup}
              >
                Abonné
                {userData.followers && userData.followers.length > 1 ? "s" : ""}
              </FollowPopup>
            )}
          </div>
        </div>
      </div>
      {redirectConv ? (
        <Redirect push to={"/messages/" + messageIdRedirect} />
      ) : null}
    </>
  );
};

export default ProfilContainer;
