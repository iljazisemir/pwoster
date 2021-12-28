import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const CREATE_POST = "CREATE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const REPWOST_POST = "REPWOST_POST";
export const UNREPWOST_POST = "UNREPWOST_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";

// COMMENTS
export const CREATE_COMMENT = "CREATE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const GET_POSTS_ERRORS = "GET_POSTS_ERRORS";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const createPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POSTS_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: CREATE_POST, payload: res.data });
        }
      });
  };
};

export const likePost = (postId, uid) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/like/${postId}`,
      data: { id: uid },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, uid } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, uid) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/unlike/${postId}`,
      data: { id: uid },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, uid } });
      })
      .catch((err) => console.log(err));
  };
};

export const repwostPost = (postId, uid) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/retweet/${postId}`,
      data: { id: uid },
    })
      .then((res) => {
        dispatch({ type: REPWOST_POST, payload: { postId, uid } });
      })
      .catch((err) => console.log(err));
  };
};

export const unrepwostPost = (postId, uid) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/unretweet/${postId}`,
      data: { id: uid },
    })
      .then((res) => {
        dispatch({ type: UNREPWOST_POST, payload: { postId, uid } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const editPost = (postId, message, picture) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
      data: { message, picture },
    })
      .then((res) => {
        dispatch({ type: EDIT_POST, payload: { postId, message, picture } });
      })
      .catch((err) => console.log(err));
  };
};

export const createComment = (postId, commenterId, commenterPseudo, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/comment-post/` + postId,
      data: { commenterId, commenterPseudo, text },
    })
      .then((res) => {
        dispatch({
          type: CREATE_COMMENT,
          payload: { postId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/update-comment-post/${postId}`,
      data: { commentId, text },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};
