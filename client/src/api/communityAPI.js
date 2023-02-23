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

export const getCommunity = (communityName) => {
  return API.get(`/communities/${communityName}`)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const getJoinedCommunities = () => {
  return API.get("/communities/member")
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const getNotJoinedCommunities = () => {
  return API.get("/communities/notmember")
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const joinCommunity = (communityName) => {
  return API.post(`/communities/${communityName}/join`)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};

export const leaveCommunity = (communityName) => {
  return API.post(`/communities/${communityName}/leave`)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};
