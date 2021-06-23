import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

// SVG
import HeartUnLike from "../../styles/assets/svg/heartUnlike";
import HeartLike from "../../styles/assets/svg/heartLike";

const LikePost = ({ post, className }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = (e) => {
    e.preventDefault();
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = (e) => {
    e.preventDefault();
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers && post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <>
      {uid && liked === false && (
        <HeartUnLike className={className} onClick={(e) => like(e)} />
      )}
      {uid && liked && (
        <HeartLike
          className={`${className} unlike-post`}
          onClick={(e) => unlike(e)}
        />
      )}
    </>
  );
};

export default LikePost;
