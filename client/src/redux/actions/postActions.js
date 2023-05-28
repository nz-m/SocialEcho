import * as api from "../api/postAPI";
import * as types from "../constants/postConstants";

export const createPostAction = (formData) => async (dispatch) => {
  try {
    const {
      error = null,
      data = null,
      info = null,
      isInappropriate = false,
      confirmationToken = null,
    } = await api.createPost(formData);

    if (error) {
      throw new Error(error);
    }

    if (isInappropriate) {
      dispatchCreatePostFail(
        dispatch,
        types.CREATE_POST_FAIL_INAPPROPRIATE,
        null
      );
    } else if (confirmationToken) {
      dispatchCreatePostFail(
        dispatch,
        types.CREATE_POST_FAIL_DETECT_CATEGORY,
        confirmationToken
      );
    } else if (info) {
      dispatchCreatePostFail(
        dispatch,
        types.CREATE_POST_FAIL_CATEGORY_MISMATCH,
        info
      );
    } else {
      dispatchCreatePostSuccess(dispatch, types.CREATE_POST_SUCCESS, data);
    }
  } catch (error) {
    dispatchCreatePostFail(dispatch, types.CREATE_POST_FAIL, error.message);
  }
};

const dispatchCreatePostSuccess = (dispatch, type, payload) => {
  dispatch({
    type,
    payload,
    meta: {
      requiresAuth: true,
    },
  });
};

const dispatchCreatePostFail = (dispatch, type, payload) => {
  dispatch({
    type,
    payload,
    meta: {
      requiresAuth: true,
    },
  });
};

export const clearCreatePostFail = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_CREATE_POST_FAIL,
    meta: {
      requiresAuth: true,
    },
  });
};

export const confirmPostAction = (confirmationToken) => async (dispatch) => {
  try {
    const { error, data } = await api.confirmPost(confirmationToken);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.CONFIRM_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.CONFIRM_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const rejectPostAction = (confirmationToken) => async (dispatch) => {
  try {
    const { error, data } = await api.rejectPost(confirmationToken);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.REJECT_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.REJECT_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const getPostAction = (id) => async (dispatch) => {
  try {
    const { error, data } = await api.getPost(id);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.GET_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const clearPostAction = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_POST,
    meta: {
      requiresAuth: true,
    },
  });
};

export const clearPostsAction = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_POSTS,
    meta: {
      requiresAuth: true,
    },
  });
};

export const getPostsAction = (limit, skip) => async (dispatch) => {
  try {
    const { error, data } = await api.getPosts(limit, skip);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.GET_POSTS_SUCCESS,
      payload: {
        page: skip / limit + 1,
        posts: data.formattedPosts,
        totalPosts: data.totalPosts,
      },
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_POSTS_FAIL,
      payload: error,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const getOwnPostAction = (id) => async (dispatch) => {
  try {
    const { error, data } = await api.getPost(id);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.GET_OWN_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_OWN_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const getComPostsAction =
  (communityId, limit, skip) => async (dispatch) => {
    try {
      const { error, data } = await api.getComPosts(communityId, limit, skip);

      if (error) {
        throw new Error(error);
      }

      dispatch({
        type: types.GET_COMMUNITY_POSTS_SUCCESS,
        payload: {
          page: skip / limit + 1,
          posts: data.formattedPosts,
          totalCommunityPosts: data.totalCommunityPosts,
        },
        meta: {
          requiresAuth: true,
        },
      });
    } catch (error) {
      dispatch({
        type: types.GET_COMMUNITY_POSTS_FAIL,
        payload: error.message,
        meta: {
          requiresAuth: true,
        },
      });
    }
  };

export const clearCommunityPostsAction = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_COMMUNITY_POSTS,
    meta: {
      requiresAuth: true,
    },
  });
};

export const getFollowingUsersPostsAction =
  (communityId) => async (dispatch) => {
    try {
      const { error, data } = await api.getFollowingUsersPosts(communityId);

      if (error) {
        throw new Error(error);
      }

      dispatch({
        type: types.GET_FOLLOWING_USERS_POSTS_SUCCESS,
        payload: data,
        meta: {
          requiresAuth: true,
        },
      });
    } catch (error) {
      dispatch({
        type: types.GET_FOLLOWING_USERS_POSTS_FAIL,
        payload: error.message,
        meta: {
          requiresAuth: true,
        },
      });
    }
  };

export const deletePostAction = (id) => async (dispatch) => {
  try {
    const { error } = await api.deletePost(id);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.DELETE_POST_SUCCESS,
      payload: id,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const likePostAction = (id) => async (dispatch) => {
  try {
    const { error, data } = await api.likePost(id);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.LIKE_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.LIKE_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const unlikePostAction = (id) => async (dispatch) => {
  try {
    const { error, data } = await api.unlikePost(id);
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.UNLIKE_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.UNLIKE_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const addCommentAction = (postId, newComment) => async (dispatch) => {
  try {
    const { error } = await api.addComment(postId, newComment);

    if (error === "inappropriateContent") {
      dispatch({
        type: types.ADD_COMMENT_FAIL_INAPPROPRIATE,
        meta: {
          requiresAuth: true,
        },
      });
      return;
    }

    throw new Error(error);
  } catch (error) {
    dispatch({
      type: types.ADD_COMMENT_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const clearCommentFailAction = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_COMMENT_FAIL,
    meta: {
      requiresAuth: true,
    },
  });
};

export const savePostAction = (id) => async (dispatch) => {
  try {
    const { error, data } = await api.savePost(id);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.SAVE_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.SAVE_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const unsavePostAction = (id) => async (dispatch) => {
  try {
    const { error, data } = await api.unsavePost(id);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.UNSAVE_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.UNSAVE_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const getSavedPostsAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getSavedPosts();

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.GET_SAVED_POSTS_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SAVED_POSTS_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const increaseSavedByCount = (postId) => async (dispatch) => {
  dispatch({
    type: types.INCREASE_SAVED_BY_COUNT,
    payload: postId,
    meta: {
      requiresAuth: true,
    },
  });
};

export const decreaseSavedByCount = (postId) => async (dispatch) => {
  dispatch({
    type: types.DECREASE_SAVED_BY_COUNT,
    payload: postId,
    meta: {
      requiresAuth: true,
    },
  });
};

export const getPublicPostsAction = (publicUserId) => async (dispatch) => {
  try {
    const { error, data } = await api.getPublicPosts(publicUserId);

    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.GET_PUBLIC_POSTS_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_PUBLIC_POSTS_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};
