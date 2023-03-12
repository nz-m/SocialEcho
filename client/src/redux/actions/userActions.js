import * as api from "../api/userAPI";
export const GET_USER = "GET_USER";

export const getUserAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
