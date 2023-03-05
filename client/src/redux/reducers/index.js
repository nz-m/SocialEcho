import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import community from "./community";
import moderation from "./moderation";
const rootReducer = combineReducers({
  posts,
  auth,
  community,
  moderation,
});

export default rootReducer;
