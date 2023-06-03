import { useSelector } from "react-redux";

import MainSection from "../components/home/MainSection";
const Home = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <div className="main-section">
      <MainSection userData={userData} />
    </div>
  );
};

export default Home;
