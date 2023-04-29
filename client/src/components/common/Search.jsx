import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import { MoonLoader } from "react-spinners";
import { BsSearch } from "react-icons/bs";
import { MdClear } from "react-icons/md";

const BASE_URL = process.env.REACT_APP_API_URL;

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const setInitialValue = () => {
    setUsers([]);
    setPosts([]);
    setLoading(false);
  };
  const debouncedHandleSearch = useMemo(
    () =>
      debounce((q) => {
        setLoading(true);
        const encodedQuery = encodeURIComponent(q);
        axios
          .get(`${BASE_URL}/posts/search?q=${encodedQuery}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            const { posts, users } = res.data;
            setPosts(posts);
            setUsers(users);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }, 800),
    [accessToken]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      setInitialValue();
      return;
    }

    debouncedHandleSearch(value);
  };

  const clearValues = () => {
    setInitialValue();
    setInputValue("");
  };
  useEffect(() => {
    return () => {
      setInitialValue();
    };
  }, []);
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <BsSearch className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </span>

      <input
        id="search"
        className="w-96 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:border-primary"
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Search"
        aria-label="Search"
        autoComplete="off"
      />

      <MdClear
        className={`absolute top-0 right-0 h-full mr-3 text-gray-400 cursor-pointer ${
          inputValue === "" ? "hidden" : "block"
        }`}
        onClick={clearValues}
      />

      {inputValue !== "" && (
        <div className="absolute z-30 w-full rounded mt-1 border shadow">
          {loading && (
            <div className="flex items-center justify-center">
              <MoonLoader size={20} color={"#008cff"} />
              <span className="ml-2">Searching...</span>
            </div>
          )}
          {posts.length > 0 && (
            <ul>
              {posts.map((post) => (
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
                          loading={"lazy"}
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
              ))}
            </ul>
          )}
          {users.length > 0 && (
            <ul>
              {users.map((user) => (
                <li key={user._id} className="border-b py-2 px-4">
                  <Link
                    to={`/user/${user._id}`}
                    className="block text-sm text-gray-700 hover:text-indigo-500"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
