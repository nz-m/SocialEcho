import {
  getNotJoinedCommunitiesAction,
  getJoinedCommunitiesAction,
  leaveCommunityAction,
} from "../redux/actions/communityActions";

// API CALL IN EACH ACTION CREATOR

export const leaveFetchData = (communityName) => (dispatch) => {
  dispatch(
    leaveCommunityAction(communityName, () =>
      dispatch(
        getNotJoinedCommunitiesAction(() =>
          dispatch(getJoinedCommunitiesAction())
        )
      )
    )
  );
};
