import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import CrossSvg from "../../styles/assets/svg/crossSvg";
import "../../styles/components/Profil/FollowPopup.css";
import ButtonFollow from "./ButtonFollow";

const FollowPopup = ({
  onClick,
  userFollowId,
  uid,
  setFollowPopup,
  ...props
}) => {
  const usersData = useSelector((state) => state.usersReducer);

  return (
    <div className="popup-container-follow">
      <div className="follow-popup">
        <div className="top-popup-follow">
          <h3 className="title-popup">{props.children}</h3>
          <CrossSvg
            className="cross-follow-popup"
            onClick={() => setFollowPopup(false)}
          />
        </div>
        <div className="space-responsive-mobile"></div>
        {usersData.map((user) => {
          for (let i = 0; i < userFollowId.length; i++) {
            if (user._id === userFollowId[i]) {
              return (
                <div className="user-follow-container" key={user._id}>
                  <Link
                    to={"/profil/" + user.pseudo}
                    className="info-follow "
                    onClick={() => {
                      setFollowPopup(false);
                    }}
                  >
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
                      <div className="bio-follow-container">{user.bio}</div>
                    </div>
                  </Link>
                  {user._id !== uid ? (
                    <ButtonFollow idToFollow={user._id} />
                  ) : (
                    ""
                  )}
                </div>
              );
            }
          }
          return null;
        })}
        <div className="space-responsive-mobile"></div>
      </div>
    </div>
  );
};

export default FollowPopup;
