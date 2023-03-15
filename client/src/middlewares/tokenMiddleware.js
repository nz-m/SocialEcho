import jwt_decode from "jwt-decode";
import { refreshTokenAction } from "../redux/actions/refreshTokenAction";

export const tokenMiddleware = (store) => (next) => async (action) => {
  if (action.meta && action.meta.requiresAuth) {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      const expiresIn = jwt_decode(token).exp * 1000 - Date.now();
      if (expiresIn < 300000) {
        // Refresh token if it expires in less than 5 minutes
        const refreshToken = state.auth.refreshToken;
        try {
          await store.dispatch(refreshTokenAction(refreshToken));
        } catch (error) {
          store.dispatch({ type: "LOGOUT" });
        }
      }
    } else {
      store.dispatch({ type: "LOGOUT" });
    }
  }
  return next(action);
};
