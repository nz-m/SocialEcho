import { useMemo, useEffect, memo, useState } from "react";
import { NavLink,Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { getJoinedCommunitiesAction } from "../../redux/actions/communityActions";
import {
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineRectangleStack,
  HiOutlineTag,
} from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GiTeamIdea } from "react-icons/gi";
import { CgDetailsMore } from "react-icons/cg";
import { useNightMode } from "../../context/NightModeContext";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

const Leftbar = ({ showLeftbar }) => {
  const dispatch = useDispatch();
  const [Settings,setSettings] = useState(false)
  const {Night,handlenightmode} = useNightMode ()
  const user = useSelector((state) => state.auth?.userData);
  const joinedCommunities = useSelector(
    (state) => state.community?.joinedCommunities
  );
 const handleSettings = ()=>{
  setSettings((prev)=>!prev)
 }
  useEffect(() => {
    dispatch(getJoinedCommunitiesAction());
  }, [dispatch]);

  const visibleCommunities = useMemo(() => {
    return joinedCommunities?.slice(0, 5);
  }, [joinedCommunities]);

  const communityLinks = useMemo(() => {
    return visibleCommunities?.map((community) => ({
      href: `/community/${community.name}`,
      label: community.name,
    }));
  }, [visibleCommunities]);

  return (
    <div className={Night ? `${showLeftbar ? "" : "hidden"}  leftbarnight`:`${showLeftbar ? "" : "hidden"} leftbar`}>
      <div className={Night ?"flex bg-slate-800 flex-col justify-start items-center" : "flex flex-col justify-start items-center" }>
        <div className={Night ?"flex flex-col bg-slate-800 items-start gap-4 w-full p-5":"flex flex-col items-start gap-4 w-full p-5" }>
          <NavLink
            className={({isActive})=> isActive ? "flex items-center gap-2 text-lg font-medium text-primary":"flex items-center gap-2 text-lg font-medium hover:text-primary"}
            to={"/home"}
          >
            <HiOutlineHome className="text-xl" />
            <p>Home</p>
          </NavLink>
          <NavLink
            className={({isActive})=> isActive ? "flex items-center gap-2 text-lg font-medium text-primary":"flex items-center gap-2 text-lg font-medium hover:text-primary"}
            to={"/profile"}
          >
            <HiOutlineUserCircle className="text-xl" />
            <p>Profile</p>
          </NavLink>
          <NavLink
            className={({isActive})=> isActive ? "flex items-center gap-2 text-lg font-medium text-primary":"flex items-center gap-2 text-lg font-medium hover:text-primary"}
            to={"/saved"}
          >
            <HiOutlineTag className="text-xl" />
            <p>Saved</p>
          </NavLink>

          {user && user.role === "general" && (
            <NavLink
              className={({isActive})=> isActive ? "flex items-center gap-2 text-lg font-medium text-primary":"flex items-center gap-2 text-lg font-medium hover:text-primary"}
              to={"/following"}
            >
              <HiOutlineRectangleStack className="text-xl" />
              <p>Following</p>
            </NavLink>
          )}
        <div className="flex flex-col gap-2">
         

          <NavLink
            className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            onClick={handleSettings}
            >
            <CgDetailsMore className="text-xl" />
            <p>More</p>
          </NavLink>
          
        {Settings ?
          <div className={Night ? "flex flex-col gap-1 pl-6 pr-6 bg-slate-900 pt-4 pb-4 rounded-xl" : "flex flex-col gap-1 pl-6 pr-6 bg-[#f7fafc] pt-4 pb-4 rounded-xl"}>
            <div className="flex justify-end items-center hover:text-white border-gray-300 border-b-[1px] pb-2"> <IoCloseSharp onClick={handleSettings} className="bg-primary" /> </div>
          <p className="flex justify-center items-center gap-2 pt-2">{Night ? <MdOutlineNightlight/> : <WiDaySunny/>} Night Mode <button className="bg-primary pl-2 pr-2 text-sm" onClick={handlenightmode}>{Night ? "OFF" : "ON"}</button></p>
        </div>
          : ''}
          </div>
    
          
          <hr className="w-full my-4 border-gray-300" />

          {communityLinks && communityLinks.length > 0 ? (
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 font-medium items-center">
                  <HiOutlineUserGroup className="text-xl" />
                  Communities
                </div>

                <NavLink
                  className="flex relative items-center text-sm font-medium text-primary mr-4"
                  to="/my-communities"
                >
                  See all
                  <p className="absolute -top-2 -right-4 text-white text-xs bg-primary w-4 h-4 rounded-full flex justify-center items-center">
                    {" "}
                    {joinedCommunities.length}
                  </p>
                </NavLink>
              </div>
              <ul className="w-full mt-3">
                {communityLinks.map((communityLink) => (
                  <li key={communityLink.href}>
                    <Link
                      className="flex items-center hover:text-primary text-gray-600 font-medium gap-2 py-1"
                      to={communityLink.href}
                    >
                      {communityLink.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No communities found.</div>
          )}
          {user && user.role === "general" && (
            <div className="md:hidden">
              <hr className="w-full my-4 border-gray-300" />
              <div className="flex justify-center gap-1 items-center">
                <GiTeamIdea />
                <Link to="/communities" className="text-primary font-medium">
                  See all communities
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Leftbar);
