import { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeaveModal from "../modals/LeaveModal";
import { getCommunityAction } from "../../redux/actions/communityActions";
import placeholder from "../../assets/placeholder.png";
import CommonLoading from "../loader/CommonLoading";

import {
  useBannerLoading,
  useIsModeratorUpdated,
} from "../../hooks/useCommunityData";
import { HiUserGroup, HiOutlineCheckBadge } from "react-icons/hi2";

const Rightbar = () => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const dispatch = useDispatch();
  const { communityName } = useParams();

  const toggleLeaveModal = useCallback(() => {
    setShowLeaveModal((prevState) => !prevState);
  }, []);

  useEffect(() => {
    dispatch(getCommunityAction(communityName));
  }, [dispatch, communityName]);

  const communityData = useSelector((state) => state.community?.communityData);

  const isModeratorOfThisCommunity = useSelector(
    (state) => state.auth?.isModeratorOfThisCommunity
  );

  const { name, description, members, rules, banner } = useMemo(
    () => communityData || {},
    [communityData]
  );

  const bannerLoaded = useBannerLoading(banner);
  const isModeratorUpdated = useIsModeratorUpdated(isModeratorOfThisCommunity);

  if (!communityData) {
    return (
      <div className="flex justify-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md ">
      <div className="flex flex-col ">
        <h2 className="text-lg font-bold">{name}</h2>
        <div className="flex items-center gap-2 text-primary mb-4">
          <HiUserGroup />
          <span className="mr-2">
            {members?.length || 0}{" "}
            {members?.length === 1 ? "member" : "members"}
          </span>
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
        {isModeratorOfThisCommunity && (
          <Link
            to={`/community/${communityName}/moderator`}
            className="px-4 bg-primary text-white shadow-md shadow-gray-50 text-sm py-1 rounded-md flex justify-center items-center w-full my-2 hover:bg-primary-600"
          >
            Moderation Panel
          </Link>
        )}

        {isModeratorUpdated && !isModeratorOfThisCommunity && (
          <button
            onClick={toggleLeaveModal}
            className="px-4 shadow-md shadow-red-50 text-sm py-1 border border-red-400 hover:text-white hover:bg-red-400 text-red-400 rounded-md flex justify-center items-center w-full my-2"
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
          <ul className="flex flex-col gap-2 ">
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
  );
};

export default Rightbar;
