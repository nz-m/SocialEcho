import * as api from "../api/postAPI";

export const CREATE_POST = "CREATE_POST";
export const GET_POSTS = "GET_POSTS";
export const GET_COMMUNITY_POSTS = "GET_COMMUNITY_POSTS";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const createPostAction = (formData, callback) => async (dispatch) => {
  try {
    const { data } = await api.createPost(formData);
    dispatch({
      type: CREATE_POST,
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

export const getPostsAction = (userId, callback) => async (dispatch) => {
  try {
    const { data } = await api.getPosts(userId);
    dispatch({
      type: GET_POSTS,
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
      type: GET_COMMUNITY_POSTS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePostAction = (id, callback) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: DELETE_POST,
      payload: id,
      meta: {
        requiresAuth: true,
      },
    });
    if (callback) callback();
  } catch (error) {
    console.log(error);
  }
};

// like post
export const likePostAction = (id, userId, callback) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, userId);
    dispatch({
      type: LIKE_POST,
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

// unlike post
export const unlikePostAction = (id, userId, callback) => async (dispatch) => {
  try {
    const { data } = await api.unlikePost(id, userId);
    dispatch({
      type: UNLIKE_POST,
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
