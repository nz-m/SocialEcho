import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    // The API returned an error message
    return { error: error.response.data.message, data: null };
  } else {
    // An unexpected error occurred
    return { error: 'An unexpected error occurred.', data: null };
  }
};
const getCommunity = async (communityName) => {
  try {
    const { data } = await API.get(`/communities/${communityName}`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getJoinedCommunities = async () => {
  try {
    const { data } = await API.get("/communities/member");
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getNotJoinedCommunities = async () => {
  try {
    const { data } = await API.get("/communities/notmember");
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const joinCommunity = async (communityName) => {
  try {
    const { data } = await API.post(`/communities/${communityName}/join`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const leaveCommunity = async (communityName) => {
  try {
    const { data } = await API.post(`/communities/${communityName}/leave`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const reportPost = async (communityName, info) => {
  try {
    const { data } = await API.put(`/communities/${communityName}/report`, {
      info,
    });
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getReportedPosts = async (communityName) => {
  try {
    const { data } = await API.get(
      `/communities/${communityName}/reported-posts`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const removeReportedPost = async (communityName, postId) => {
  try {
    const { data } = await API.delete(
      `/communities/${communityName}/reported-posts/${postId}`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getCommunityMembers = async (communityName) => {
  try {
    const { data } = await API.get(`/communities/${communityName}/members`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getCommunityMods = async (communityName) => {
  try {
    const { data } = await API.get(`/communities/${communityName}/moderators`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const banUser = async (communityName, userId) => {
  try {
    const { data } = await API.post(
      `/communities/${communityName}/ban/${userId}`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const unbanUser = async (communityName, userId) => {
  try {
    const { data } = await API.post(
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
