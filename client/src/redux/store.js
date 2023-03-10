import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { isValidToken } from "../utils/authUtils";
import { refreshTokenAction } from "../redux/actions/refreshTokenAction";

const persistedState = {
  auth: {
    accessToken: null,
    refreshToken: null,
    userData: null,
  },
};

// Check if access token is valid, if not, call refresh token action
const checkTokens = async () => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const refreshToken = JSON.parse(
    localStorage.getItem("profile")
  )?.refreshToken;
  if (accessToken && refreshToken) {
    if (isValidToken(accessToken)) {
      persistedState.auth.accessToken = accessToken;
      persistedState.auth.refreshToken = refreshToken;
      persistedState.auth.userData = JSON.parse(
        localStorage.getItem("profile")
      )?.user;
    } else {
      await refreshTokenAction(refreshToken);
    }
  }
};

checkTokens();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, tokenMiddleware],
  preloadedState: persistedState,
});

export default store;
