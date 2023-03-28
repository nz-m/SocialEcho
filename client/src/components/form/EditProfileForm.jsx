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
  const [interests, setInterests] = useState([
    userInfo.interests && userInfo.interests[0] ? userInfo.interests[0] : "",
    userInfo.interests && userInfo.interests[1] ? userInfo.interests[1] : "",
    userInfo.interests && userInfo.interests[2] ? userInfo.interests[2] : "",
  ]);

  const handlebioChange = (event) => {
    setbio(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleInterestChange = (index, event) => {
    const newInterests = [...interests];
    newInterests[index] = event.target.value;
    setInterests(newInterests);
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
      setInterests(["", "", ""]);
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
            bio:
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
            Interests:
          </label>
          {interests.map((interest, index) => (
            <input
              key={index}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`interest_${index}`}
              type="text"
              value={interest}
              onChange={(event) => handleInterestChange(index, event)}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
