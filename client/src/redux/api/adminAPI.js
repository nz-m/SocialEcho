import { ADMIN_API, handleApiError } from "./utils";

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
