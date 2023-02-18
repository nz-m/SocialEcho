import React from "react";
import { BsSearch } from "react-icons/bs";

const SuggestedContent = () => {
  return (
    <div className=" px-2 py-2">
      <div className="flex items-center bg-white md:w-80 shadow-xl shadow-[#68b2cf33] rounded-xl mt-3 px-4 py-2">
        <BsSearch className="text-gray-500"/>
        <input
          className="pl-2 rounded  focus:outline-none"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="bg-white shadow-xl  rounded-xl mt-7 px-2 py-3">
        <h1 className="text-xl font-bold  pl-4">Trends for you</h1>
        <h1 className=" text-base font-semibold pl-4 mt-2">#BaBYdoge</h1>
        <h1 className=" text-base font-semibold pl-4 mt-2">#BaBYdoge</h1>
        <h1 className=" text-base font-semibold pl-4 mt-2">#BaBYdoge</h1>
      </div>
      <div>
        <div className="bg-white shadow-xl rounded-lg mt-8 px-4 py-4">
          <div className="flex justify-between">
          <p className="text-base font-semibold ">Suggested for you</p>
          <p className="text-base font-medium text-gray-500 ">See All</p>
          </div>
          
          <div className=" flex items-center justify-between mt-2">
            <div>
            <p className="font-semibold ">Nasa</p>
            <p className="text-xs">@Nasa</p>
            </div>
           
            <button className="ml-8 btn btn-primary btn-sm rounded-full capitalize">
              Follow
            </button>
          </div>
          <div className=" flex items-center justify-between mt-2">
            <div>
            <p className="font-semibold ">Nasa</p>
            <p className="text-xs">@Nasa</p>
            </div>
           
            <button className="ml-8 btn btn-primary btn-sm rounded-full capitalize">
              Follow
            </button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default SuggestedContent;
