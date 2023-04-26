import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getJoinedCommunitiesAction } from "../redux/actions/communityActions";
import JoinedCommunityCard from "../components/community/JoinedCommunityCard";
const MyCommunities = () => {
  const dispatch = useDispatch();

  const joinedCommunities = useSelector(
    (state) => state.community?.joinedCommunities
  );

  useEffect(() => {
    dispatch(getJoinedCommunitiesAction());
  }, [dispatch]);

  const communityCards = useMemo(() => {
    if (!joinedCommunities) {
      return null;
      // later add a loading spinner
    }

    return joinedCommunities.map((community) => (
      <div key={community._id} className="grid grid-cols-2 gap-5">
        <JoinedCommunityCard
          className="grid grid-cols-2 gap-5"
          community={community}
        />
      </div>
    ));
  }, [joinedCommunities]);

  return (
    <div className="flex flex-wrap justify-center w-6/12 px-10 py-6">
      {communityCards}
    </div>
  );
};

export default MyCommunities;
