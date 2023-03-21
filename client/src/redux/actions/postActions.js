import * as api from "../api/postAPI";

export const CREATE_POST = "CREATE_POST";
export const GET_POSTS = "GET_POSTS";
export const GET_COMMUNITY_POSTS = "GET_COMMUNITY_POSTS";
export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const UPDATE_POST = "UPDATE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const SAVE_POST = "SAVE_POST";
export const UNSAVE_POST = "UNSAVE_POST";
export const GET_SAVED_POSTS = "GET_SAVED_POSTS";

export const createPostAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createPost(formData);
    dispatch({
      type: CREATE_POST,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPostsAction =
  (userId, limit = 10, skip = 0) =>
  async (dispatch) => {
    try {
      const { data } = await api.getPosts(userId, limit, skip);
      dispatch({
        type: GET_POSTS,
        payload: {
          page: skip / limit + 1,
          posts: data,
        },
        meta: {
          requiresAuth: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getComPostsAction =
  (id, limit = 10, skip = 0) =>
  async (dispatch) => {
    try {
      const { data } = await api.getComPosts(id, limit, skip);
      dispatch({
        type: GET_COMMUNITY_POSTS,
        payload: {
          page: skip / limit + 1,
          posts: data,
        },
        meta: {
          requiresAuth: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deletePostAction = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: DELETE_POST,
      payload: id,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// like post
export const likePostAction = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, userId);
    dispatch({
      type: LIKE_POST,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// unlike post
export const unlikePostAction = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.unlikePost(id, userId);
    dispatch({
      type: UNLIKE_POST,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// add comment
export const addCommentAction = (postId, newComment) => async () => {
  try {
    await api.addComment(postId, newComment);
  } catch (error) {
    console.log(error);
  }
};

//get comments
export const getCommentsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getComments(id);
    dispatch({
      type: GET_COMMENTS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// save post
export const savePostAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.savePost(id);
    dispatch({
      type: SAVE_POST,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// unsave post
export const unsavePostAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.unsavePost(id);
    dispatch({
      type: UNSAVE_POST,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPostsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getSavedPosts();
    dispatch({
      type: GET_SAVED_POSTS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
