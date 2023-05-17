import { useSelector } from "react-redux";

import UserProfile from "../components/profile/UserProfile";
const Profile = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return <UserProfile userData={userData} />;
};

export default Profile;
