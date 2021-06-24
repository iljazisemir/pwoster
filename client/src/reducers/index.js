import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import errorReducer from "./error.reducer";
import postReducer from "./post.reducer";
import messageReducer from "./message.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  errorReducer,
  postReducer,
  messageReducer,
});
