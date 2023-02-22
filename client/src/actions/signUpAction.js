import * as api from "../api";
const SIGNUP = "SIGNUP";

// action creators
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
      console.log(data.message);
      // navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};
