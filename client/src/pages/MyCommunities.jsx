import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getJoinedCommunitiesAction } from "../redux/actions/communityActions";
import JoinedCommunityCard from "../components/community/JoinedCommunityCard";
import Leftbar from "../components/home/LeftBar";
import Rightbar from "../components/home/RightBar";
const MyCommunities = () => {
  const dispatch = useDispatch();

  const { joinedCommunities } = useSelector((state) => state.community) ?? {};

  useEffect(() => {
    dispatch(getJoinedCommunitiesAction());
  }, [dispatch]);

  const communityCards = useMemo(() => {
    if (!joinedCommunities) {
      return null;
      // later add a loading spinner
    }

    return joinedCommunities.map((community) => (
      <div
        key={community._id}
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
      >
        <JoinedCommunityCard community={community} />
      </div>
    ));
  }, [joinedCommunities]);

  return (
    <div className="flex mx-6">
      <Leftbar />

      <div className="flex flex-wrap justify-center">{communityCards}</div>
      <Rightbar />
    </div>
  );
};

export default MyCommunities;
