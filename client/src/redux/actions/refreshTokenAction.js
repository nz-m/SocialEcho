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

export const refreshTokenAction = (refreshToken) => async (dispatch) => {
  try {
    const response = await API.post("/users/refresh-token", {
      refreshToken,
    });
    dispatch({
      type: "REFRESH_TOKEN_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REFRESH_TOKEN_FAIL",
      payload: error.response.data,
    });
  }
};
