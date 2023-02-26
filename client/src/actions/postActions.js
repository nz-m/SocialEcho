import * as api from "../api/postAPI";

export const createPostAction = (formData, callback) => async (dispatch) => {
  try {
    const { data } = await api.createPost(formData);
    dispatch({
      type: "CREATE_POST",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
    if (callback) callback();
  } catch (error) {
    console.log(error);
  }
};

export const getPostsAction = (callback) => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({
      type: "GET_POSTS",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
    if (callback) callback();
  } catch (error) {
    console.log(error);
  }
};

export const getComPostsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getComPosts(id);
    dispatch({
      type: "GET_COMMUNITY_POSTS",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
