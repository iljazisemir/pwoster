import { GET_USER_ERRORS } from "../actions/user.actions";
import { GET_POSTS_ERRORS } from "../actions/post.actions";

const initialState = { userError: [], postError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_ERRORS:
      return {
        postError: action.payload,
        userError: [],
      };
    case GET_USER_ERRORS:
      return {
        userError: action.payload,
        postError: [],
      };
    default:
      return state;
  }
}
