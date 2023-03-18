import {
  getNotJoinedCommunitiesAction,
  getJoinedCommunitiesAction,
  leaveCommunityAction,
} from "../redux/actions/communityActions";

export const leaveFetchData = (communityName) => async (dispatch) => {
  try {
    await dispatch(leaveCommunityAction(communityName));
    await dispatch(getNotJoinedCommunitiesAction());
    await dispatch(getJoinedCommunitiesAction());
  } catch (error) {
    console.log(error);
    // handle error
  }
};
