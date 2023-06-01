import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJoinedCommunitiesAction } from "../redux/actions/communityActions";
import JoinedCommunityCard from "../components/community/JoinedCommunityCard";
import CommonLoading from "../components/loader/CommonLoading";
const MyCommunities = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const joinedCommunities = useSelector(
    (state) => state.community?.joinedCommunities
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getJoinedCommunitiesAction());
    };
    fetchData().then(() => setLoading(false));
  }, [dispatch, loading]);

  const communityCards = useMemo(() => {
    return joinedCommunities?.map((community) => (
      <div key={community._id} className="grid grid-cols-2 gap-5">
        <JoinedCommunityCard
          className="grid grid-cols-2 gap-5"
          community={community}
        />
      </div>
    ));
  }, [joinedCommunities]);
  if (loading) {
    return (
      <div className="flex justify-center w-full h-full">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="col-span-2 bg-white mt-6 border rounded-md">
      {communityCards}
    </div>
  );
};

export default MyCommunities;
