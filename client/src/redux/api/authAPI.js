import { API, handleApiError } from "./utils";

export const signIn = async (formData) => {
  try {
    const res = await API.post("/users/signin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const signUp = async (formData) => {
  try {
    const res = await API.post("/users/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return {
      error: error.response.data.errors,
      data: null,
    };
  }
};

export const logout = async () => {
  try {
    const res = await API.post("/users/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getModProfile = async () => {
  try {
    const res = await API.get("/users/moderator");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getContextAuthData = async () => {
  try {
    const res = await API.get("/auth/context-data/primary");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTrustedContextAuthData = async () => {
  try {
    const res = await API.get("/auth/context-data/trusted");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getBlockedAuthContextData = async () => {
  try {
    const res = await API.get("/auth/context-data/blocked");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserPreferences = async () => {
  try {
    const res = await API.get("/auth/user-preferences");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteContextAuthData = async (contextId) => {
  try {
    const res = await API.delete(`/auth/context-data/${contextId}`);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const blockContextAuthData = async (contextId) => {
  try {
    const res = await API.patch(`/auth/context-data/block/${contextId}`);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const unblockContextAuthData = async (contextId) => {
  try {
    const res = await API.patch(`/auth/context-data/unblock/${contextId}`);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};
