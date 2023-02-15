import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
export default configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
