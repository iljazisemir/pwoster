import React, { useContext } from "react";
import CrossSvg from "../../styles/assets/svg/crossSvg";
import "../../styles/components/Post/ContainerCreatePost.css";
import { PopupCreatePostContext } from "../AppContext";

const ContainerCreatePost = ({
  popupQuoteTweet,
  setPopupQuoteTweet,
  ...props
}) => {
  const [popupCreatePost, setPopupCreatePost] = useContext(
    PopupCreatePostContext
  );

  const popup = () => {
    if (popupQuoteTweet) setPopupQuoteTweet(false);
    setPopupCreatePost(false);
  };

  return (
    <div className="popup-create-post" >
      <div className="popup-create-post-container">
        <div className="top-container-popup-create">
          <CrossSvg className="cross-popup-update" onClick={popup} />
        </div>
        <div className="main-create-post-container">{props.children}</div>
      </div>
    </div>
  );
};

export default ContainerCreatePost;
