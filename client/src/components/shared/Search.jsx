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
    <div>
      <input
        type="text"
        placeholder="Search"
        className="h-10 py-1 bg-white border w-full rounded-full text-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-500 transition duration-300"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {isFocused && (
        <div className="mt-2 absolute left-0 right-0 top-full w-full bg-white border border rounded-md px-4 py-2 text-gray-600 text-sm z-50 opacity-100 pointer-events-auto transition duration-300">
          Try searching for people, communities, and posts
        </div>
      )}
    </div>
  );
};

export default Search;
