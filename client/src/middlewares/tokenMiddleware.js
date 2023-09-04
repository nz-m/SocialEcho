import jwt_decode from "jwt-decode";
import { refreshTokenAction } from "../redux/actions/refreshTokenAction";

const TOKEN_REFRESH_THRESHOLD = 1800000; // 30 minutes in ms

const shouldRefreshToken = (token) => {
  if (!token) return false;

  const expiresIn = jwt_decode(token).exp * 1000 - Date.now();
  return expiresIn < TOKEN_REFRESH_THRESHOLD;
};

export const tokenMiddleware = (store) => (next) => async (action) => {
  if (action.meta && action.meta.requiresAuth) {
    const state = store?.getState();
    const token = state.auth?.accessToken;

    if (shouldRefreshToken(token)) {
      const refreshToken = state.auth.refreshToken;
      try {
        await store.dispatch(refreshTokenAction(refreshToken));
        const newToken = store.getState().auth.accessToken;

        if (!newToken) {
          throw new Error("Access token not found after refresh");
        }
      } catch (error) {
        store.dispatch({ type: "LOGOUT" });
      }
    } else if (!token) {
      store.dispatch({ type: "LOGOUT" });
    }
  }
  return next(action);
};
