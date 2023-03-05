import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";

const persistedState = {
  auth: {
    accessToken: JSON.parse(localStorage.getItem("profile"))?.accessToken,
    refreshToken: JSON.parse(localStorage.getItem("profile"))?.refreshToken,
    userData: JSON.parse(localStorage.getItem("profile"))?.user,
  },
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, tokenMiddleware],
  preloadedState: persistedState,
});

export default store;
