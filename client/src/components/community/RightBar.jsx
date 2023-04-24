import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeaveModal from "../modals/LeaveModal";
import { getCommunityAction } from "../../redux/actions/communityActions";
import placeholder from "../../assets/placeholder.png";

import {
  useBannerLoading,
  useIsModeratorUpdated,
} from "../../hooks/useCommunityData";
import { HiUserGroup, HiOutlineCheckBadge } from "react-icons/hi2";

const RightBar = () => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const dispatch = useDispatch();
  const { communityName } = useParams();

  const toggleLeaveModal = () => {
    setShowLeaveModal(!showLeaveModal);
  };

  useEffect(() => {
    dispatch(getCommunityAction(communityName));
  }, [dispatch, communityName]);

  const communityData = useSelector((state) => state.community?.communityData);
  const isModerator = useSelector((state) => state.auth?.isModerator);

  const { name, description, members, rules, banner } = useMemo(
    () => communityData || {},
    [communityData]
  );

  const bannerLoaded = useBannerLoading(banner);
  const isModeratorUpdated = useIsModeratorUpdated(isModerator);

  if (!communityData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-3/12 h-[84vh] bg-white sticky top-24 left-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg ">
      <div className="bg-white rounded-md">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4">{name}</h2>
          <div className="flex items-center gap-2 text-primary mb-4">
            <HiUserGroup />
            <span className="mr-2">{members?.length || 0} members</span>
          </div>
        </div>

        {bannerLoaded ? (
          <img
            src={banner}
            alt="community banner"
            className="w-full h-40 rounded-md object-cover mb-4"
            onError={(e) => {
              e.target.src = placeholder;
            }}
          />
        ) : (
          <img
            src={placeholder}
            alt="community banner placeholder"
            className="w-full h-40 rounded-md object-cover mb-4"
          />
        )}

        <h3>{description}</h3>

        <div className="my-4">
          {isModerator && (
            <Link
              to={`/community/${communityName}/moderator`}
              className="bg-primary px-4 py-2 text-white rounded-2xl "
            >
              Moderation Panel
            </Link>
          )}

          {isModeratorUpdated && !isModerator && (
            <button
              onClick={toggleLeaveModal}
              className="px-4 shadow-lg shadow-red-50 py-1 border border-red-400 hover:text-white hover:bg-red-400 text-red-400 rounded-2xl my-2"
            >
              Leave Community
            </button>
          )}
          {
            <LeaveModal
              show={showLeaveModal}
              toggle={toggleLeaveModal}
              communityName={communityName}
            />
          }
        </div>
        {rules && rules.length > 0 && (
          <div className="text-slate-900 mb-4">
            <span className="font-bold">Community Guidelines:</span>
            <ul className="flex flex-col gap-2">
              {rules.map((rule) => (
                <li key={rule._id} className="flex items-start gap-2 ">
                  <HiOutlineCheckBadge className="text-lg flex-shrink-0 mt-1" />
                  {rule.rule}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightBar;
