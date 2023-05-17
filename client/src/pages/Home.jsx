import { useSelector } from "react-redux";

import MainSection from "../components/home/MainSection";
const Home = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return <MainSection userData={userData} />;
};

export default Home;
