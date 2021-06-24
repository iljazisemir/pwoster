import {
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  GET_MESSAGES,
  SEND_MESSAGE,
} from "../actions/message.actions";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    // case CREATE_MESSAGE:
    //   state.push(action.payload);
    //   return state;
    case DELETE_MESSAGE:
      return state.filter(
        (message) => message._id !== action.payload.messageId
      );
    case SEND_MESSAGE:
      return state.map((message) => {
        if (message._id === action.payload.messageId) {
          return {
            ...message,
            senderId: action.payload.senderId,
            text: action.payload.text,
          };
        }
        return message;
      });
    default:
      return state;
  }
}
