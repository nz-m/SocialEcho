import * as api from "../api/postAPI";

export const createPostAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createPost(formData);
    dispatch({
      type: "CREATE_POST",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({
      type: "GET_POSTS",
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
