/**
 * A module that exports two axios instances: API and COMMUNITY_API.
 * Both instances have a base URL taken from the environment variable REACT_APP_API_URL.
 * The API instance adds an authentication interceptor to add the bearer token to all requests.
 * The COMMUNITY_API instance adds a content-type header of application/json and the same authentication interceptor as API.
 * The module also exports a function handleApiError that takes an axios error object and returns an object containing an error message and null data.
 * @module utils
 */

import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const authInterceptor = (req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(authInterceptor);

export const COMMUNITY_API = axios.create({
  baseURL: BASE_URL,
});

COMMUNITY_API.interceptors.request.use((req) => {
  req.headers["Content-Type"] = "application/json";
  return authInterceptor(req);
});

export const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return { error: error.response.data.message, data: null };
  } else {
    return { error: "An unexpected error occurred.", data: null };
  }
};
