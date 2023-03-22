import * as api from "../api/communityAPI";
import * as types from "../constants/communityConstants";

export const getCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { error, data } = await api.getCommunity(communityName);
    if (error) {
      throw new Error(error);
    }

    dispatch({
      type: types.GET_COMMUNITY_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_COMMUNITY_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const getJoinedCommunitiesAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getJoinedCommunities();
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_JOINED_COMMUNITIES_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_JOINED_COMMUNITIES_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const getNotJoinedCommunitiesAction = () => async (dispatch) => {
  try {
    const { error, data } = await api.getNotJoinedCommunities();
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_NOT_JOINED_COMMUNITIES_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_NOT_JOINED_COMMUNITIES_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const joinCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { error, data } = await api.joinCommunity(communityName);
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.JOIN_COMMUNITY_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.JOIN_COMMUNITY_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const leaveCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { error, data } = await api.leaveCommunity(communityName);

    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.LEAVE_COMMUNITY_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.LEAVE_COMMUNITY_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

// Keep the cb
export const reportPostAction = (communityName, info) => async (dispatch) => {
  try {
    const { error, data } = await api.reportPost(communityName, info);
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.REPORT_POST_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.REPORT_POST_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const getReportedPostsAction = (communityName) => async (dispatch) => {
  try {
    const { error, data } = await api.getReportedPosts(communityName);
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_REPORTED_POSTS_SUCCESS,
      payload: data.reportedPosts,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_REPORTED_POSTS_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const removeReportedPostAction =
  (communityName, postId) => async (dispatch) => {
    try {
      const { error } = await api.removeReportedPost(communityName, postId);
      if (error) {
        throw new Error(error);
      }
      dispatch({
        type: types.DELETE_REPORTED_POST_SUCCESS,
        payload: postId,
        meta: {
          requiresAuth: true,
        },
      });
    } catch (error) {
      dispatch({
        type: types.DELETE_REPORTED_POST_FAIL,
        payload: error.message,
        meta: {
          requiresAuth: true,
        },
      });
    }
  };

export const getComMembersAction = (communityName) => async (dispatch) => {
  try {
    const { error, data } = await api.getCommunityMembers(communityName);
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_COMMUNITY_MEMBERS_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_COMMUNITY_MEMBERS_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const getComModsAction = (communityName) => async (dispatch) => {
  try {
    const { error, data } = await api.getCommunityMods(communityName);
    if (error) {
      throw new Error(error);
    }
    dispatch({
      type: types.GET_COMMUNITY_MODS_SUCCESS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GET_COMMUNITY_MODS_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const banUserAction = (communityName, userId) => async (dispatch) => {
  try {
    const { error } = await api.banUser(communityName, userId);
    if (error) {
      throw new Error(error);
    }
    dispatch(getComMembersAction(communityName));
  } catch (error) {
    dispatch({
      type: types.BAN_USER_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};

export const unbanUserAction = (communityName, userId) => async (dispatch) => {
  try {
    const { error } = await api.unbanUser(communityName, userId);
    if (error) {
      throw new Error(error);
    }
    dispatch(getComMembersAction(communityName));
  } catch (error) {
    dispatch({
      type: types.UNBAN_USER_FAIL,
      payload: error.message,
      meta: {
        requiresAuth: true,
      },
    });
  }
};
