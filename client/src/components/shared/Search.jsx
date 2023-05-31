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
    <div className="relative flex items-center justify-center flex-grow">
      <input
        type="text"
        placeholder="Search"
        className="w-1/2 h-10 px-4 py-1 text-gray-700 bg-white border border-gray-300 rounded-full text-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-500 transition duration-300"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {isFocused && (
        <div className="absolute left-0 top-full w-1/2 bg-white border border-gray-300 rounded-b-lg px-4 py-2 text-gray-600 text-sm z-50 opacity-100 pointer-events-auto transition duration-300">
          Try searching for people, topics, or keywords
        </div>
      )}
    </div>
  );
};

export default Search;
