import { PulseLoader } from "react-spinners";

const FallbackLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-9/12">
      <PulseLoader color="#008cff" />
    </div>
  );
};

export default FallbackLoading;
