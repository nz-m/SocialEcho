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

export const getCommunity = (name) => {
  return API.get(`/communities/${name}`)
    .then((res) => {
      return { error: null, data: res.data };
    })
    .catch((err) => {
      return { error: err, data: null };
    });
};
