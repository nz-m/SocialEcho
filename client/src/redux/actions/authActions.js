import * as api from "../api/authAPI";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";

export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAIL = "REFRESH_TOKEN_FAIL";
export const GET_MOD_PROFILE = "GET_MOD_PROFILE";

// action creators

export const logoutAction = () => async (dispatch) => {
  try {
    const { refreshToken } = JSON.parse(localStorage.getItem("profile"));
    const { data } = await api.logout(refreshToken);
    dispatch({ type: LOGOUT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const signUpAction = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.signUp(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: SIGNUP,
        data: error.response.data.errors,
      });
    } else {
      dispatch({
        type: SIGNUP,
        data,
      });
      navigate("/signin");
    }
  } catch (error) {
    console.log(error);
  }
};

export const signInAction = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.signIn(formData);
    const { error, data } = response;
    if (error) {
      console.log(error.response.data.errors);
      // handle error
    } else {
      dispatch({
        type: SIGNIN,
        data,
      });
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getModProfileAction = () => async (dispatch) => {
  try {
    const { data } = await api.getModProfile();
    dispatch({
      type: GET_MOD_PROFILE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
