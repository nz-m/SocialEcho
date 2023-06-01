import { useSelector } from "react-redux";

import UserProfile from "../components/profile/UserProfile";
const Profile = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <div className="col-span-2 bg-white mt-6 border rounded-md">
      <UserProfile userData={userData} />
    </div>
  );
};

export default Profile;
