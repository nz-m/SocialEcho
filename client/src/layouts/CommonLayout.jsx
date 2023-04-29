import LeftBar from "../components/common/LeftBar";

const CommonLayout = ({ children }) => {
  return (
    <div className="flex lg:px-40 mx-auto bg-[#F6F7FA] my-20">
      <LeftBar />
      {children}
    </div>
  );
};

export default CommonLayout;
