import { useEffect } from "react";
import { getNotJoinedCommunitiesAction } from "../redux/actions/communityActions";
import { useDispatch, useSelector } from "react-redux";
import CommonLoading from "../components/loader/CommonLoading";
import CommunityCard from "../components/community/CommunityCard";

const AllCommunities = () => {
  const dispatch = useDispatch();

  const notJoinedCommunities = useSelector(
    (state) => state.community?.notJoinedCommunities
  );

  useEffect(() => {
    dispatch(getNotJoinedCommunitiesAction());
  }, [dispatch]);

  if (!notJoinedCommunities) {
    return (
      <div className="main-section flex items-center justify-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="main-section grid grid-cols-1 items-center gap-5 bg-white px-4 py-4 md:grid-cols-2 border">
      {notJoinedCommunities?.map((community) => (
        <CommunityCard key={community._id} community={community} />
      ))}
    </div>
  );
};

export default AllCommunities;
