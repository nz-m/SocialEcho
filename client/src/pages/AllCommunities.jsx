import React, { useEffect } from "react";
import Leftbar from "../components/home/LeftBar";
import Rightbar from "../components/home/RightBar";
import CommunityCard from "../components/community/CommunityCard";
import { getNotJoinedCommunitiesAction } from "../redux/actions/communityActions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/home/Navbar";

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
    <div className="bg-[#F6F7FA]">
    <Navbar />
    <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
      <Leftbar />
      <div className="grid grid-cols-2 gap-4 w-6/12 px-10 py-6">
        {notJoinedCommunities?.map((community) => (
          <CommunityCard key={community._id} community={community} />
        ))}
      </div>

      <Rightbar />
    </div>
    </div>
  );
};

export default AllCommunities;
