import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeaveModal from "../modals/LeaveModal";

import { getCommunityAction } from "../../redux/actions/communityActions";
import placeholder from "../../assets/placeholder.png";

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

  const { communityData } = useSelector((state) => state.community) ?? {};
  const { isModerator } = useSelector((state) => state.auth) ?? {};

  const [isModeratorUpdated, setIsModeratorUpdated] = useState(false);

  const { name, description, members, rules, banner } = useMemo(
    () => communityData || {},
    [communityData]
  );

  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    if (banner) {
      const image = new Image();
      image.onload = () => setBannerLoaded(true);
      image.src = banner;
    }
    return () => {
      setBannerLoaded(false);
    };
  }, [banner]);

  useEffect(() => {
    if (isModerator !== null) {
      setIsModeratorUpdated(true);
    }
  }, [isModerator]);

  if (!communityData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/4 p-4 h-screen bg-white sticky top-0">
      <div className="bg-white rounded-md  p-4">
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
              className="text-white btn-primary btn-sm"
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
