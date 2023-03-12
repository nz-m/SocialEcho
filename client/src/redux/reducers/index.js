import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import community from "./community";
import moderation from "./moderation";
import user from "./user";
const rootReducer = combineReducers({
  posts,
  auth,
  community,
  moderation,
  user,
});

export default rootReducer;
