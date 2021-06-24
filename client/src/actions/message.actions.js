import axios from "axios";

export const GET_MESSAGES = "GET_MESSAGES";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const SEND_MESSAGE = "CREATE_MESSAGE";

export const getMessages = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/message`)
      .then((res) => {
        dispatch({ type: GET_MESSAGES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const createMessage = (user1Id, user2Id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/message`,
      data: { user1Id, user2Id },
    })
      .then((res) => {
        dispatch({
          type: CREATE_MESSAGE,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteMessage = (messageId, user1Id, user2Id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/message/` + messageId,
      data: { user1Id, user2Id },
    })
      .then((res) => {
        dispatch({
          type: DELETE_MESSAGE,
          payload: { user1Id, user2Id },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const sendMessage = (messageId, senderId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}/api/message/send-message/` +
        messageId,
      data: { senderId, text },
    })
      .then((res) => {
        dispatch({
          type: SEND_MESSAGE,
          payload: { messageId, senderId, text },
        });
      })
      .catch((err) => console.log(err));
  };
};
