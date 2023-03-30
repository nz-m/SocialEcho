import jwt_decode from "jwt-decode";
import { refreshTokenAction } from "../redux/actions/refreshTokenAction";

/**
 * Middleware for refreshing JWT access token before it expires.
 *
 * @param {Object} store - The Redux store
 * @returns {function} The middleware function
 *
 * @description
 * This middleware checks if an action requires authentication by looking for the `requiresAuth` property in the action's `meta` field.
 * If the action requires authentication, it checks if the JWT access token is present in the state and not expired.
 * If the token is expired, it tries to refresh it using the JWT refresh token.
 * If the refresh succeeds, it gets the new access token from the state and continues with the original action.
 * If the refresh fails, it logs out the user and redirects them to the login page.
 */
export const tokenMiddleware = (store) => (next) => async (action) => {
  if (action.meta && action.meta.requiresAuth) {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      const expiresIn = jwt_decode(token).exp * 1000 - Date.now();
      if (expiresIn < 300000) {
        const refreshToken = state.auth.refreshToken;
        try {
          await store.dispatch(refreshTokenAction(refreshToken));
          const newToken = store.getState().auth.accessToken;
          if (!newToken) {
            throw new Error("Access token not found after refresh");
          }
        } catch (error) {
          store.dispatch({ type: "LOGOUT" });
          window.location.href = "/signin";
        }
      } else {
        setTimeout(async () => {
          const refreshToken = state.auth.refreshToken;
          try {
            await store.dispatch(refreshTokenAction(refreshToken));
            const newToken = store.getState().auth.accessToken;
            if (!newToken) {
              throw new Error("Access token not found after refresh");
            }
          } catch (error) {
            store.dispatch({ type: "LOGOUT" });
            window.location.href = "/signin";
          }
        }, 3300000);
      }
    } else {
      store.dispatch({ type: "LOGOUT" });
      window.location.href = "/signin";
    }
  }
  return next(action);
};
