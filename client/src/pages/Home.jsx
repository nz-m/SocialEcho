import { useSelector } from "react-redux";

import MainSection from "../components/home/MainSection";
const Home = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <div className="col-span-2  mt-6 border rounded-md">
      <MainSection userData={userData} />
    </div>
  );
};

export default Home;
