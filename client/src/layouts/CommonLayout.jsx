import LeftBar from "../components/common/LeftBar";
import Navbar from "../components/common/Navbar";

const CommonLayout = ({ children }) => {
  return (
    <div className="bg-[#F6F7FA]">
      <Navbar />
      <div className="flex lg:px-40 mx-auto bg-[#F6F7FA]">
        <LeftBar />
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
