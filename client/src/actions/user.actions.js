import axios from "axios";

export const GET_USER = "GET_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPLOAD_PICTURE_PROFIL = "UPLOAD_PICTURE_PROFIL";
export const UPLOAD_PICTURE_COVER = "UPLOAD_PICTURE_COVER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const unFollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (userId, bio, tweetName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
      data: { bio, tweetName },
    })
      .then((res) => {
        dispatch({ type: UPDATE_USER, payload: { bio, tweetName } });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPictureProfil = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/uploadProfil`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
            .then((res) => {
              dispatch({
                type: UPLOAD_PICTURE_PROFIL,
                payload: res.data.profilePicture,
              });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPictureCover = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/uploadCover`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
            .then((res) => {
              dispatch({
                type: UPLOAD_PICTURE_COVER,
                payload: res.data.coverPicture,
              });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};
