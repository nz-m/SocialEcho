import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const ADMIN_URL = `${BASE_URL}/admin`;

const authInterceptor = (req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

const adminAuthInterceptor = (req) => {
  const accessToken = JSON.parse(localStorage.getItem("admin"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

export const API = axios.create({
  baseURL: BASE_URL,
});

export const ADMIN_API = axios.create({
  baseURL: ADMIN_URL,
});

export const COMMUNITY_API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(authInterceptor);
ADMIN_API.interceptors.request.use(adminAuthInterceptor);
COMMUNITY_API.interceptors.request.use((req) => {
  req.headers["Content-Type"] = "application/json";
  return authInterceptor(req);
});

export const handleApiError = async (error) => {
  try {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};
