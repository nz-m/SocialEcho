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
    return <CommonLoading />;
  }
  return (
    <div className="col-span-2 bg-white mt-6 border rounded-md">
      {notJoinedCommunities?.map((community) => (
        <CommunityCard key={community._id} community={community} />
      ))}
    </div>
  );
};

export default AllCommunities;
