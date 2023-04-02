import { COMMUNITY_API, handleApiError } from "./utils";

const getCommunity = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.get(`/communities/${communityName}`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getJoinedCommunities = async () => {
  try {
    const { data } = await COMMUNITY_API.get("/communities/member");
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getNotJoinedCommunities = async () => {
  try {
    const { data } = await COMMUNITY_API.get("/communities/notmember");
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const joinCommunity = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.post(
      `/communities/${communityName}/join`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const leaveCommunity = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.post(
      `/communities/${communityName}/leave`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const reportPost = async (communityName, info) => {
  try {
    const { data } = await COMMUNITY_API.put(
      `/communities/${communityName}/report`,
      {
        info,
      }
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getReportedPosts = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.get(
      `/communities/${communityName}/reported-posts`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const removeReportedPost = async (communityName, postId) => {
  try {
    const { data } = await COMMUNITY_API.delete(
      `/communities/${communityName}/reported-posts/${postId}`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getCommunityMembers = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.get(
      `/communities/${communityName}/members`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getCommunityMods = async (communityName) => {
  try {
    const { data } = await COMMUNITY_API.get(
      `/communities/${communityName}/moderators`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const banUser = async (communityName, userId) => {
  try {
    const { data } = await COMMUNITY_API.post(
      `/communities/${communityName}/ban/${userId}`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const unbanUser = async (communityName, userId) => {
  try {
    const { data } = await COMMUNITY_API.post(
      `/communities/${communityName}/unban/${userId}`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

export {
  getCommunity,
  getJoinedCommunities,
  getNotJoinedCommunities,
  joinCommunity,
  leaveCommunity,
  reportPost,
  getReportedPosts,
  removeReportedPost,
  getCommunityMembers,
  getCommunityMods,
  banUser,
  unbanUser,
};
