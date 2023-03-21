import * as api from "../api/authAPI";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const LOGOUT = "LOGOUT";

export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAIL = "REFRESH_TOKEN_FAIL";
export const GET_MOD_PROFILE_SUCCESS = "GET_MOD_PROFILE_SUCCESS";
export const GET_MOD_PROFILE_FAIL = "GET_MOD_PROFILE_FAIL";

const ERROR_MESSAGE = "Something went wrong.";
const SIGNUP_SUCCESS_MESSAGE =
  "You have successfully created an account. Please sign in.";

export const setInitialAuthState = (navigate) => async (dispatch) => {
  await dispatch({ type: LOGOUT });
  navigate("/signin");
};

export const logoutAction = () => async (dispatch) => {
  try {
    const { data } = await api.logout();
    localStorage.removeItem("profile");
    dispatch({ type: LOGOUT, payload: data });
  } catch (error) {
    dispatch({ type: LOGOUT, payload: ERROR_MESSAGE });
  }
};

export const signUpAction = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.signUp(formData);
    const { error } = response;
    if (error) {
      dispatch({
        type: SIGNUP_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: SIGNUP_SUCCESS_MESSAGE,
      });
      navigate("/signin");
    }
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILED,
      payload: ERROR_MESSAGE,
    });
  }
};

export const signInAction = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.signIn(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: SIGNIN_FAILED,
        payload: error,
      });
    } else {
      const { user, accessToken, refreshToken, accessTokenUpdatedAt } = data;
      const profile = {
        user,
        accessToken,
        refreshToken,
        accessTokenUpdatedAt,
      };
      localStorage.setItem("profile", JSON.stringify(profile));
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: profile,
      });
      navigate("/");
    }
  } catch (error) {
    await dispatch({
      type: SIGNIN_FAILED,
      payload: ERROR_MESSAGE,
    });
    navigate("/signin");
  }
};

export const getModProfileAction = () => async (dispatch) => {
  try {
    const { data } = await api.getModProfile();
    dispatch({
      type: GET_MOD_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MOD_PROFILE_FAIL,
      payload: ERROR_MESSAGE,
    });
  }
};
