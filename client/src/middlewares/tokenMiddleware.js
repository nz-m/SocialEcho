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
          // Refresh token succeeded, get the new access token from the state
          const newToken = store.getState().auth.accessToken;
          // If new token is still null, logout the user
          if (!newToken) {
            throw new Error("Access token not found after refresh");
          }
        } catch (error) {
          console.error("Error refreshing token:");
          store.dispatch({ type: "LOGOUT" });
          // Redirect to login page
          window.location.href = "/signin";
        }
      } else {
        // Set timeout to refresh token just before expiry
        setTimeout(async () => {
          const refreshToken = state.auth.refreshToken;
          try {
            await store.dispatch(refreshTokenAction(refreshToken));
            // Refresh token succeeded, get the new access token from the state
            const newToken = store.getState().auth.accessToken;
            // If new token is still null, logout the user
            if (!newToken) {
              throw new Error("Access token not found after refresh");
            }
          } catch (error) {
            console.error("Error refreshing token:");
            store.dispatch({ type: "LOGOUT" });
            // Redirect to login page
            window.location.href = "/signin";
          }
        }, expiresIn - 300000); // Refresh token 5 minutes before expiry
      }
    } else {
      console.error("Access token not found");
      store.dispatch({ type: "LOGOUT" });
      // Redirect to login page
      window.location.href = "/signin";
    }
  }
  return next(action);
};
