import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
      setLoading(false);
    };
    fetchData();
  }, [dispatch, loading]);

  const communityCards = useMemo(() => {
    return joinedCommunities.map((community) => (
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
    <div className="flex flex-wrap justify-center w-6/12 px-10 py-6">
      {communityCards}
    </div>
  );
};

export default MyCommunities;
