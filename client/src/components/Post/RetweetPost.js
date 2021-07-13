import React, { useContext, useEffect, useState } from "react";
import PencilSvg from "../../styles/assets/svg/pencilSvg";
import RetweetSvg from "../../styles/assets/svg/retweetSvg";
import { PopupCreatePostContext, UidContext } from "../AppContext";
import "../../styles/components/Post/RetweetPost.css";
import { useDispatch } from "react-redux";
import { retweetPost, unretweetPost } from "../../actions/post.actions";
import QuoteTweet from "./QuoteTweet";
import ContainerCreatePost from "./ContainerCreatePost";
import CreateQuoteTweet from "./CreateQuoteTweet";
import CrossSvg from "../../styles/assets/svg/crossSvg";

const RetweetPost = ({ className, post, userPost }) => {
  const [retweeted, setRetweeted] = useState(false);
  const [popupRetweet, setPopupRetweet] = useState(false);
  const [popupQuoteTweet, setPopupQuoteTweet] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const [popupCreatePost, setPopupCreatePost] = useContext(
    PopupCreatePostContext
  );

  const retweet = (e) => {
    e.preventDefault();
    dispatch(retweetPost(post._id, uid));
    setRetweeted(true);
    setPopupRetweet(false);
  };

  const unretweet = (e) => {
    e.preventDefault();
    dispatch(unretweetPost(post._id, uid));
    setRetweeted(false);
    setPopupRetweet(false);
  };

  useEffect(() => {
    if (post.retweet && post.retweet.includes(uid)) setRetweeted(true);
    else setRetweeted(false);
  }, [uid, post.retweet, retweeted]);

  return (
    <>
      <RetweetSvg
        className={retweeted ? "retweeted-post" : className}
        onClick={(e) => {
          setPopupRetweet(!popupRetweet);
          e.preventDefault();
        }}
      />
      {popupRetweet && (
        <div className="popup-create-post" onClick={e => e.preventDefault()}>
        <div className="popup-container-retweet">
        <div className="top-container-popup-create">
          <CrossSvg className="cross-popup-update" onClick={() => setPopupRetweet(false)} />
        </div>
          {uid && retweeted === false ? (
            <button className="retweet-post" onClick={(e) => retweet(e)}>
              <RetweetSvg className="svg-edit-post" />
              <span className="span-post">Repwoster</span>
            </button>
          ) : (
            <button className="retweet-post" onClick={(e) => unretweet(e)}>
              <RetweetSvg className="svg-edit-post" />
              <span className="span-post">Annuler le Repwost</span>
            </button>
          )}
          <button
            className="quote-tweet"
            onClick={(e) => {
              setPopupQuoteTweet(true);
              e.preventDefault();
            }}
          >
            <PencilSvg className="svg-edit-post" />
            <span className="span-post">Citer le Tweet</span>
          </button>
        </div>
        </div>
      )}
      {popupQuoteTweet && (
        // <ContainerCreatePost
        //   setPopupQuoteTweet={setPopupQuoteTweet}
        //   popupQuoteTweet={popupQuoteTweet}
        // >
          <CreateQuoteTweet
            quoteTweetId={post._id}
            setPopupQuoteTweet={setPopupQuoteTweet}
            popupQuoteTweet={popupQuoteTweet}
          />
        // </ContainerCreatePost>
      )}
    </>
  );
};

export default RetweetPost;
