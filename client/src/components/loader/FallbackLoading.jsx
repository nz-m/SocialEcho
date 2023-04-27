import { HashLoader } from "react-spinners";

const FallbackLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-6/12">
      <div className="flex flex-col justify-center items-center">
        <HashLoader color="#008cff" size={90} />
      </div>
    </div>
  );
};

export default FallbackLoading;
