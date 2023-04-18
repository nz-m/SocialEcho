import { API, handleApiError } from "./utils";

const signIn = async (formData) => {
  try {
    const res = await API.post("/users/signin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
  }
};

const signUp = async (formData) => {
  try {
    const res = await API.post("/users/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null, data: res.data };
  } catch (err) {
    return {
      error: err.response.data.errors,
      data: null,
    };
  }
};

const logout = async () => {
  try {
    const res = await API.post("/users/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getModProfile = async () => {
  try {
    const res = await API.get("/users/moderator");
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getContextAuthData = async () => {
  try {
    const res = await API.get("/auth/context-data/primary");
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getTrustedContextAuthData = async () => {
  try {
    const res = await API.get("/auth/context-data/trusted");
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getUserPreferences = async () => {
  try {
    const res = await API.get("/auth/user-preferences");
    return { error: null, data: res.data };
  } catch (err) {
    return handleApiError(err);
  }
};

export {
  signIn,
  signUp,
  logout,
  getModProfile,
  getContextAuthData,
  getTrustedContextAuthData,
  getUserPreferences,
};
