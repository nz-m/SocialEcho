import React from "react";
import { BsSearch } from "react-icons/bs";

const SuggestedContent = () => {
  return (
    <div className="w-[500px]">
      <div className="flex items-center bg-[rgb(239,243,244)] rounded-xl mt-3 p-1">
        <BsSearch />
        <input
          className="placeholder-[rgb(121,134,144)] pl-[40px] m-1 rounded bg-[rgb(239,243,244)] border-[rgb(29,155,240)] hover:border-[1px]"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="bg-[rgb(247,249,249)] rounded-xl mt-8">
        <h1 className="text-xl font-bold mt-4 pl-4">Trends for you</h1>
        <h1 className=" text-base font-semibold pl-4 mt-2">#BaBYdoge</h1>
        <h1 className=" text-base font-semibold pl-4 mt-2">#BaBYdoge</h1>
        <h1 className=" text-base font-semibold pl-4 mt-2">#BaBYdoge</h1>
      </div>
      <div>
        <div className="bg-[rgb(247,249,249)] rounded-lg mt-8">
          <h1 className="text-xl font-bold mt-4 pl-4">Who to follow</h1>
          <div className="items-center flex">
            <h1 className="pb-3 font-semibold mt-4 pl-4 ">NASA</h1>
            <button className="ml-8 btn btn-primary btn-sm rounded-xl ">
              Follow
            </button>
          </div>
        </div>
        <div className="bg-[rgb(247,249,249)] rounded-xl">
          <div className="items-center flex">
            <h1 className="pb-3 font-semibold mt-4 pl-4 ">NASA</h1>
            <button className="ml-8 btn btn-primary btn-sm rounded-xl">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedContent;
