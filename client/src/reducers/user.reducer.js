import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_USER,
  UPLOAD_PICTURE_COVER,
  UPLOAD_PICTURE_PROFIL,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    case UPDATE_USER:
      return {
        ...state,
        bio: action.payload.bio,
        tweetName: action.payload.tweetName,
      };
    case UPLOAD_PICTURE_PROFIL:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case UPLOAD_PICTURE_COVER:
      return {
        ...state,
        coverPicture: action.payload,
      };
    default:
      return state;
  }
}
