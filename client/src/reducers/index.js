import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
const rootReducer = combineReducers({
  posts,
  auth,
});

export default rootReducer;
