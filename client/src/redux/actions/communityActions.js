import * as api from "../api/communityAPI";

export const GET_COMMUNITY = "GET_COMMUNITY";
export const GET_JOINED_COMMUNITIES = "GET_JOINED_COMMUNITIES";
export const GET_NOT_JOINED_COMMUNITIES = "GET_NOT_JOINED_COMMUNITIES";
export const JOIN_COMMUNITY = "JOIN_COMMUNITY";
export const LEAVE_COMMUNITY = "LEAVE_COMMUNITY";
export const REPORT_POST = "REPORT_POST";
export const GET_REPORTED_POSTS = "GET_REPORTED_POSTS";
export const DELETE_REPORTED_POST = "DELETE_REPORTED_POST";
export const GET_COMMUNITY_MEMBERS = "GET_COMMUNITY_MEMBERS";
export const GET_COMMUNITY_MODS = "GET_COMMUNITY_MODS";

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

export const getJoinedCommunitiesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getJoinedCommunities();
    dispatch({
      type: GET_JOINED_COMMUNITIES,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNotJoinedCommunitiesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getNotJoinedCommunities();
    dispatch({
      type: GET_NOT_JOINED_COMMUNITIES,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const joinCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.joinCommunity(communityName);
    dispatch({
      type: JOIN_COMMUNITY,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const leaveCommunityAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.leaveCommunity(communityName);
    dispatch({
      type: LEAVE_COMMUNITY,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Keep the cb
export const reportPostAction = (communityName, info) => async (dispatch) => {
  try {
    const { data } = await api.reportPost(communityName, info);
    dispatch({
      type: REPORT_POST,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
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
  (communityName, postId) => async (dispatch) => {
    try {
      await api.removeReportedPost(communityName, postId);
      dispatch({
        type: DELETE_REPORTED_POST,
        payload: postId,
        meta: {
          requiresAuth: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getComMembersAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.getCommunityMembers(communityName);
    dispatch({
      type: GET_COMMUNITY_MEMBERS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getComModsAction = (communityName) => async (dispatch) => {
  try {
    const { data } = await api.getCommunityMods(communityName);
    dispatch({
      type: GET_COMMUNITY_MODS,
      payload: data,
      meta: {
        requiresAuth: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const banUserAction = (communityName, userId) => async (dispatch) => {
  try {
    await api.banUser(communityName, userId);
    dispatch(getComMembersAction(communityName));
  } catch (error) {
    console.log(error);
  }
};

export const unbanUserAction = (communityName, userId) => async (dispatch) => {
  try {
    await api.unbanUser(communityName, userId);
    dispatch(getComMembersAction(communityName));
  } catch (error) {
    console.log(error);
  }
};
