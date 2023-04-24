import CommonLayout from "./CommonLayout";
import RightBar from "../components/common/RightBar";

const SelectiveLayout = ({ children }) => {
  return (
    <>
      <CommonLayout>
        {children}
        <RightBar />
      </CommonLayout>
    </>
  );
};

export default SelectiveLayout;
