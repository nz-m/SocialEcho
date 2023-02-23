import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import community from "./community";
const rootReducer = combineReducers({
  posts,
  auth,
  community,
});

export default rootReducer;
