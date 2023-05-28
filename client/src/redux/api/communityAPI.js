import { COMMUNITY_API, handleApiError } from "./utils";

export const getCommunity = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.get(`/communities/${communityName}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getJoinedCommunities = async () => {
  try {
    const { data } = await COMMUNITY_API.get("/communities/member");
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getNotJoinedCommunities = async () => {
  try {
    const { data } = await COMMUNITY_API.get("/communities/notmember");
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const joinCommunity = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.post(
      `/communities/${communityName}/join`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const leaveCommunity = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.post(
      `/communities/${communityName}/leave`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const reportPost = async (info) => {
  try {
    const { data } = await COMMUNITY_API.post(`/communities/report`, {
      info,
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getReportedPosts = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.get(
      `/communities/${communityName}/reported-posts`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const removeReportedPost = async (postId) => {
  try {
    const { data } = await COMMUNITY_API.delete(
      `/communities/reported-posts/${postId}`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCommunityMembers = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.get(
      `/communities/${communityName}/members`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCommunityMods = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.get(
      `/communities/${communityName}/moderators`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const banUser = async (communityName, userId) => {
  try {
    const { data } = await COMMUNITY_API.post(
      `/communities/${communityName}/ban/${userId}`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const unbanUser = async (communityName, userId) => {
  try {
    const { data } = await COMMUNITY_API.post(
      `/communities/${communityName}/unban/${userId}`
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
