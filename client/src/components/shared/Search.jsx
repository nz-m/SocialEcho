import React, { useState } from "react";

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative z-30">
      <input
        type="text"
        placeholder="Search"
        className="w-[560px] h-10 px-4 py-1 text-gray-700 bg-white border border-gray-300 rounded-full text-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-500 transition duration-300"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {isFocused && (
        <div className="mt-2 absolute left-0 right-0 top-full w-full bg-white border border-gray-300 rounded-b-lg px-4 py-2 text-gray-600 text-sm z-50 opacity-100 pointer-events-auto transition duration-300">
          Try searching for people, topics, or keywords
        </div>
      )}
    </div>
  );
};

export default Search;
