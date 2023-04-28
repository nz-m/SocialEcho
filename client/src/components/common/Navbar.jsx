import { useCallback, useState, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import Logo from "../../assets/SocialEcho.png";
import { MoonLoader } from "react-spinners";

const BASE_URL = process.env.REACT_APP_API_URL;

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedHandleSearch = useCallback(
    debounce((q) => {
      setLoading(true);
      const encodedQuery = encodeURIComponent(q);
      axios
        .get(`${BASE_URL}/posts/search-post?q=${encodedQuery}`)
        .then((res) => {
          const data = res.data;
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, 800),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      setResults([]);
      setLoading(false);
      return;
    }
    debouncedHandleSearch(value);
  };
  const handleInputBlur = () => {
    setResults([]);
    setLoading(false);
    setIsFocused(false);
  };
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <input
        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
      />

      {isFocused && (
        <div
          className="absolute z-30 w-full bg-white rounded-md mt-1"
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
        >
          <ul>
            {loading ? (
              <div className="flex items-center justify-center">
                <MoonLoader size={20} color={"#008cff"} />
                <span className="ml-2">Searching...</span>
              </div>
            ) : (
              results.map((post) => (
                <li key={post._id} className="border-b py-2 px-4">
                  <Link
                    to={`/post/${post._id}`}
                    className="block text-sm text-gray-700 hover:text-indigo-500"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={post.user.avatar}
                          alt={post.user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">{post.body}</div>
                        <div className="text-sm text-gray-500">
                          Posted by {post.user.name} in {post.community.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="lg:px-40 mx-auto sticky top-0 left-0">
      <div className="flex justify-between items-center bg-white rounded-md px-10">
        <Link to="/" className="w-36 h-full object-contain">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default memo(Navbar);
