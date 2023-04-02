import React, { useState } from "react";
import { updateUserAction } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex flex-col gap-2 justify-center">
        <h1 className="text-2xl font-semibold ">Edit Profile</h1>
        <button onClick={() => navigate(-1)} className="text-blue-500">
          Go back to profile
        </button>
        <p className="text-grey-500">
          Please provide your bio, location and interests.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="bio">
            Bio:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            type="text"
            value={bio}
            onChange={handlebioChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="location"
          >
            Location:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="interests"
          >
            Interests (separate by comma) :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="interest"
            type="text"
            value={interests}
            onChange={handleInterestChange}
            maxLength={100}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
