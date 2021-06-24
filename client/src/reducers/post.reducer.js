import {
  CREATE_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  EDIT_POST,
  GET_POSTS,
  LIKE_POST,
  RETWEET_POST,
  UNLIKE_POST,
  UNRETWEET_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.uid, ...post.likers],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.uid),
          };
        }
        return post;
      });
    case RETWEET_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            retweet: [action.payload.uid, ...post.retweet],
          };
        }
        return post;
      });
    case UNRETWEET_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            retweet: post.retweet.filter((id) => id !== action.payload.uid),
          };
        }
        return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case EDIT_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
            picture: action.payload.picture,
          };
        } else return post;
      });
    case CREATE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              return {
                ...post,
                ...comment,
                text: action.payload.text,
              };
            }
          });
        }
        return post;
      });
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
}
