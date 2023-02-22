import * as api from "../api";
const SIGNIN = "SIGNIN";

// action creators
export const signInAction = (formData, navigate) => async (dispatch) => {
  try {
      const response = await api.signIn(formData);
      console.log(response);
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
}
