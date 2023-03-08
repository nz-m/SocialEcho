import * as api from "../api/communityAPI";

export const GET_COMMUNITY = "GET_COMMUNITY";
export const GET_JOINED_COMMUNITIES = "GET_JOINED_COMMUNITIES";
export const GET_NOT_JOINED_COMMUNITIES = "GET_NOT_JOINED_COMMUNITIES";
export const JOIN_COMMUNITY = "JOIN_COMMUNITY";
export const LEAVE_COMMUNITY = "LEAVE_COMMUNITY";
export const REPORT_POST = "REPORT_POST";
export const GET_REPORTED_POSTS = "GET_REPORTED_POSTS";
export const DELETE_REPORTED_POST = "DELETE_REPORTED_POST";

export const getCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.getCommunity(communityName);
    dispatch({
      type: GET_COMMUNITY,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJoinedCommunitiesAction = (callback) => async (dispatch) => {
  try {
    const { data } = await api.getJoinedCommunities();
    dispatch({
      type: GET_JOINED_COMMUNITIES,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });

    if (callback) {
      callback();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNotJoinedCommunitiesAction = (callback) => async (dispatch) => {
  try {
    const { data } = await api.getNotJoinedCommunities();
    dispatch({
      type: GET_NOT_JOINED_COMMUNITIES,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });

    if (callback) {
      callback();
    }
  } catch (error) {
    console.log(error);
  }
};

export const joinCommunityAction =
  (communityName, callback) => async (dispatch) => {
    try {
      const { data } = await api.joinCommunity(communityName);
      dispatch({
        type: JOIN_COMMUNITY,
        payload: data,
        meta: {
          requiresAuth: true,
        },
      });
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };

export const leaveCommunityAction =
  (communityName, callback) => async (dispatch) => {
    try {
      const { data } = await api.leaveCommunity(communityName);
      dispatch({
        type: LEAVE_COMMUNITY,
        payload: data,
        meta: {
          requiresAuth: true,
        },
      });
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };

export const reportPostAction =
  (communityName, info, callback) => async (dispatch) => {
    try {
      const { data } = await api.reportPost(communityName, info);
      dispatch({
        type: REPORT_POST,
        payload: data,
        meta: {
          requiresAuth: true,
        },
      });
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getReportedPostsAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.getReportedPosts(communityName);
    dispatch({
      type: GET_REPORTED_POSTS,
      payload: data.reportedPosts,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeReportedPostAction =
  (communityName, postId, callback) => async (dispatch) => {
    try {
      await api.removeReportedPost(communityName, postId);
      dispatch({
        type: DELETE_REPORTED_POST,
        payload: postId,
        meta: {
          requiresAuth: true,
        },
      });
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };
