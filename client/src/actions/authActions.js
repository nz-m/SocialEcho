import * as api from "../api/authAPI";
const SIGNUP = "SIGNUP";
const SIGNIN = "SIGNIN";
const LOGOUT = "LOGOUT";

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
      console.log(error.response.data.errors);

      // handle error
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
