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
      <div key={community._id} className="mb-5 border bg-white rounded-md p-3">
        <JoinedCommunityCard className="mb-5" community={community} />
      </div>
    ));
  }, [joinedCommunities]);
  if (loading) {
    return (
      <div className="col-span-2 flex justify-center items-center h-screen">
        <CommonLoading />
      </div>
    );
  }

  return <div className="main-section">{communityCards}</div>;
};

export default MyCommunities;
