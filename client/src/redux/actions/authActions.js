import * as api from "../api/authAPI";
import * as types from "../constants/authConstants";

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
    dispatch({ type: types.LOGOUT, payload: types.ERROR_MESSAGE });
  }
};

export const signUpAction =
  (formData, navigate, isConsentGiven = false, email) =>
  async (dispatch) => {
    try {
      localStorage.removeItem("profile");
      const response = await api.signUp(formData);
      const { error } = response;
      if (error) {
        dispatch({
          type: types.SIGNUP_FAIL,
          payload: error,
        });
      } else {
        if (!isConsentGiven) {
          dispatch({
            type: types.SIGNUP_SUCCESS,
            payload: types.SIGNUP_SUCCESS_MESSAGE,
          });
          navigate("/signin");
        }

        if (isConsentGiven) {
          dispatch({
            type: types.SIGNUP_SUCCESS,
            payload: types.SIGNUP_SUCCESS_MESSAGE,
          });
          navigate("/auth/verify", { state: email });
        }
      }
    } catch (error) {
      dispatch({
        type: types.SIGNUP_FAIL,
        payload: types.ERROR_MESSAGE,
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
      payload: types.ERROR_MESSAGE,
    });
    navigate("/signin");
  }
};

export const getModProfileAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getModProfile();
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_MOD_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_MOD_PROFILE_FAIL,
      payload: types.ERROR_MESSAGE,
    });
  }
};

export const getContextAuthDataAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getContextAuthData();
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_CONTEXT_AUTH_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_CONTEXT_AUTH_DATA_FAIL,
      payload: types.ERROR_MESSAGE,
    });
  }
};

export const getTrustedContextAuthDataAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getTrustedContextAuthData();
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_TRUSTED_AUTH_CONTEXT_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_TRUSTED_AUTH_CONTEXT_DATA_FAIL,
      payload: types.ERROR_MESSAGE,
    });
  }
};

export const getUserPreferencesAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getUserPreferences();
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_USER_PREFERENCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_PREFERENCES_FAIL,
      payload: types.ERROR_MESSAGE,
    });
  }
};
