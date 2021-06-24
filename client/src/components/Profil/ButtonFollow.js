import React, { useEffect, useState } from "react";
import "../../styles/components/Profil/ButtonFollow.css";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const ButtonFollow = ({ idToFollow, className }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleUnfollow = (e) => {
    e.preventDefault();
    dispatch(unFollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };
  const handleFollow = (e) => {
    e.preventDefault();
    setIsFollowed(true);
    dispatch(followUser(userData._id, idToFollow));
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <div className={className} onClick={(e) => e.preventDefault()}>
      {isFollowed && !isEmpty(userData) && (
        <button className="button-unfollow" onClick={(e) => handleUnfollow(e)}>
          Se désabonner
        </button>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <button className="button-follow" onClick={(e) => handleFollow(e)}>
          Suivre
        </button>
      )}
    </div>
  );
};

export default ButtonFollow;
