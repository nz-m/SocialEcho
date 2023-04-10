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
    <div className="w-3.5/12 h-[84vh] bg-white sticky top-24 left-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg">
      <div className="bg-white rounded-md p-4">
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

        <h2 className="text-lg font-bold mb-4">{name}</h2>
        <h3>{description}</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <span className="mr-2">{members?.length || 0}</span>
          joined members
        </div>
        <div>
          {isModerator && (
            <Link
              to={`/community/${communityName}/moderator`}
              className="text-blue-500"
            >
              Moderation Panel
            </Link>
          )}

          {isModeratorUpdated && !isModerator && (
            <button
              onClick={toggleLeaveModal}
              className="text-blue-500 ml-2 hover:underline"
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
          <div className="text-gray-500 mb-4">
            <span className="font-bold">Community Guidelines:</span>
            <ul className="list-disc list-inside">
              {rules.map((rule) => (
                <li key={rule._id}>{rule.rule}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightBar;
