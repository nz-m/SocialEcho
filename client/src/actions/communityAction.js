import * as api from "../api/communityAPI";

export const getCommunityAction = (name) => async (dispatch) => {
  try {
    const { data } = await api.getCommunity(name);
    dispatch({
      type: "GET_COMMUNITY",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
