import { ADMIN_API, handleApiError } from "./utils";

export const signIn = async (credential) => {
  try {
    const res = await ADMIN_API.post("/signin", credential);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getServicePreferences = async () => {
  try {
    const res = await ADMIN_API.get("/preferences");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateServicePreferences = async (preferences) => {
  try {
    await ADMIN_API.put("/preferences", preferences);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getLogs = async () => {
  try {
    const res = await ADMIN_API.get("/logs");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteLogs = async () => {
  try {
    await ADMIN_API.delete("/logs");
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCommunities = async () => {
  try {
    const res = await ADMIN_API.get("/communities");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCommunity = async (communityId) => {
  try {
    const res = await ADMIN_API.get(`/community/${communityId}`);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getModerators = async () => {
  try {
    const res = await ADMIN_API.get("/moderators");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const addModerator = async (communityId, moderatorId) => {
  try {
    await ADMIN_API.patch("/add-moderators", null, {
      params: { communityId, moderatorId },
    });
  } catch (error) {
    return handleApiError(error);
  }
};

export const removeModerator = async (communityId, moderatorId) => {
  try {
    await ADMIN_API.patch("/remove-moderators", null, {
      params: { communityId, moderatorId },
    });
  } catch (error) {
    return handleApiError(error);
  }
};
