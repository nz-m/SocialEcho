import React, { useState } from "react";
import { updateUserAction } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {IoChevronBackCircleOutline} from "react-icons/io5";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();

  const userInfo = locationHook.state?.userInfo;

  const dispatch = useDispatch();
  const [bio, setbio] = useState(userInfo.bio ? userInfo.bio : "");
  const [location, setLocation] = useState(
    userInfo.location ? userInfo.location : ""
  );
  const [interests, setInterests] = useState(
    userInfo.interests ? userInfo.interests : ""
  );

  const handlebioChange = (event) => {
    setbio(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterests(event.target.value);
  };

  const formData = {
    bio,
    location,
    interests,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(updateUserAction(userInfo._id, formData));
      setbio("");
      setLocation("");
      setInterests("");
      navigate(-1);
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="flex bg-slate-50 justify-center items-center md:h-screen shadow-2xl shadow-[#F3F8FF] rounded-lg">


      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white  rounded-lg px-8 py-7 shadow-2xl shadow-[#F3F8FF]"
      >
        <div className="mb-2 py-2">

          <button onClick={() => navigate(-1)} className="text-blue-500">
            <IoChevronBackCircleOutline className='text-3xl'/>
          </button>
          <p className="text-grey-700 font-semibold text-center">
            Please provide your bio, location and interests.
          </p>
        </div>
        <div className="mb-4">
         
          <input
            className="border border-slate-200 appearance-none rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            type="text"
            value={bio}
            onChange={handlebioChange}
            placeholder='edit your bio'
          />
        </div>
        <div className="mb-4">

          <input
            className="border border-slate-200 appearance-none rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder='location'
          />
        </div>
        <div className="mb-4">

          <input
            className="border border-slate-200 appearance-none rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="interest"
            type="text"
            value={interests}
            onChange={handleInterestChange}
            maxLength={100}
            placeholder=' Interests (separate by comma) :'
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
