import { useSelector } from "react-redux";

import UserProfile from "../components/profile/UserProfile";
const Profile = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <div className="main-section">
      <UserProfile userData={userData} />
    </div>
  );
};

export default Profile;
