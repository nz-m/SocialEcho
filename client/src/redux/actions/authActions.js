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
    localStorage.removeItem("profile");
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
      const { user, accessToken, refreshToken, accessTokenUpdatedAt } = data;
      const profile = {
        user,
        accessToken,
        refreshToken,
        accessTokenUpdatedAt,
      };
      localStorage.setItem("profile", JSON.stringify(profile));
      dispatch({
        type: SIGNIN,
        data: profile,
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

// import * as api from "../api/authAPI";

// export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
// export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
// export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
// export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
// export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

// export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
// export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
// export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

// export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
// export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE";

// export const GET_MOD_PROFILE_REQUEST = "GET_MOD_PROFILE_REQUEST";
// export const GET_MOD_PROFILE_SUCCESS = "GET_MOD_PROFILE_SUCCESS";
// export const GET_MOD_PROFILE_FAILURE = "GET_MOD_PROFILE_FAILURE";

// export const logoutAction = () => async (dispatch) => {
//   dispatch({ type: LOGOUT_REQUEST });
//   try {
//     const { refreshToken } = JSON.parse(localStorage.getItem("profile"));
//     const { data } = await api.logout(refreshToken);
//     localStorage.removeItem("profile");
//     dispatch({ type: LOGOUT_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: LOGOUT_FAILURE, payload: error.message });
//   }
// };

// const request = (actionType) => {
//   return { type: actionType };
// };

// const handleResponse = (
//   response,
//   successActionType,
//   failureActionType,
//   dispatch
// ) => {
//   const { error, data } = response;
//   if (error) {
//     dispatch({ type: failureActionType, payload: error.response.data.errors });
//   } else {
//     dispatch({ type: successActionType, payload: data });
//   }
// };

// export const signUpAction = (formData, navigate) => async (dispatch) => {
//   dispatch(request(SIGNUP_REQUEST));
//   try {
//     const response = await api.signUp(formData);
//     handleResponse(response, SIGNUP_SUCCESS, SIGNUP_FAILURE, dispatch);
//     navigate("/signin");
//   } catch (error) {
//     dispatch({ type: SIGNUP_FAILURE, payload: error.message });
//   }
// };

// export const signInAction = (formData, navigate) => async (dispatch) => {
//   dispatch(request(SIGNIN_REQUEST));
//   try {
//     const response = await api.signIn(formData);
//     handleResponse(response, SIGNIN_SUCCESS, SIGNIN_FAILURE, dispatch);
//     navigate("/");
//   } catch (error) {
//     dispatch({ type: SIGNIN_FAILURE, payload: error.message });
//   }
// };

// export const getModProfileAction = () => async (dispatch) => {
//   dispatch(request(GET_MOD_PROFILE_REQUEST));
//   try {
//     const { data } = await api.getModProfile();
//     dispatch({ type: GET_MOD_PROFILE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: GET_MOD_PROFILE_FAILURE, payload: error.message });
//   }
// };
