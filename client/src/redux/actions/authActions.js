import * as api from "../api/authAPI";
import * as types from "../constants/authConstants";

const ERROR_MESSAGE = "Something went wrong.";
const SIGNUP_SUCCESS_MESSAGE =
  "You have successfully created an account. Please sign in.";

export const setInitialAuthState = (navigate) => async (dispatch) => {
  await dispatch({ type: types.LOGOUT });
  navigate("/signin");
};

export const logoutAction = () => async (dispatch) => {
  try {
    const { data } = await api.logout();
    localStorage.removeItem("profile");
    dispatch({ type: types.LOGOUT, payload: data });
  } catch (error) {
    dispatch({ type: types.LOGOUT, payload: ERROR_MESSAGE });
  }
};

export const signUpAction = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.signUp(formData);
    const { error } = response;
    if (error) {
      dispatch({
        type: types.SIGNUP_FAIL,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SIGNUP_SUCCESS,
        payload: SIGNUP_SUCCESS_MESSAGE,
      });
      navigate("/signin");
    }
  } catch (error) {
    dispatch({
      type: types.SIGNUP_FAIL,
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
        type: types.SIGNIN_FAIL,
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
        type: types.SIGNIN_SUCCESS,
        payload: profile,
      });
      navigate("/");
    }
  } catch (error) {
    await dispatch({
      type: types.SIGNIN_FAIL,
      payload: ERROR_MESSAGE,
    });
    navigate("/signin");
  }
};

export const getModProfileAction = () => async (dispatch) => {
  try {
    const { data } = await api.getModProfile();
    dispatch({
      type: types.GET_MOD_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_MOD_PROFILE_FAIL,
      payload: ERROR_MESSAGE,
    });
  }
};
