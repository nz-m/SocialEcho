import * as api from "../api/userAPI";
export const GET_USER = "GET_USER";
export const GET_PUBLIC_USERS = "GET_PUBLIC_USERS";
export const GET_PUBLIC_USER_PROFILE = "GET_PUBLIC_USER_PROFILE";
export const CHANGE_FOLLOW_STATUS = "CHANGE_FOLLOW_STATUS";

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

export const updateUserAction = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, formData);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPublicUsersAction = () => async (dispatch) => {
  try {
    const { data } = await api.getPublicUsers();
    dispatch({
      type: GET_PUBLIC_USERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPublicUserAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPublicUser(id);
    dispatch({
      type: GET_PUBLIC_USER_PROFILE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const followUserAction = (id) => async (dispatch) => {
  try {
    await api.followUser(id);
    dispatch({
      type: CHANGE_FOLLOW_STATUS,
      data: { isFollowing: true },
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUserAction = (id) => async (dispatch) => {
  try {
    await api.unfollowUser(id);

    dispatch({
      type: CHANGE_FOLLOW_STATUS,
      data: { isFollowing: false },
    });
  } catch (error) {
    console.log(error);
  }
};
