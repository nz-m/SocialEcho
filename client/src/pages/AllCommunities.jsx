import { useEffect } from "react";
import CommunityCard from "../components/community/CommunityCard";
import { getNotJoinedCommunitiesAction } from "../redux/actions/communityActions";
import { useDispatch, useSelector } from "react-redux";

const AllCommunities = () => {
  const dispatch = useDispatch();

  const notJoinedCommunities = useSelector(
    (state) => state.community?.notJoinedCommunities
  );

  useEffect(() => {
    dispatch(getNotJoinedCommunitiesAction());
  }, [dispatch]);

  if (!notJoinedCommunities) {
    return null;
    // later add a loading spinner
  }
  return (
    <div className="grid grid-cols-2 gap-4 w-6/12 px-10 py-6">
      {notJoinedCommunities?.map((community) => (
        <CommunityCard key={community._id} community={community} />
      ))}
    </div>
  );
};

export default AllCommunities;
