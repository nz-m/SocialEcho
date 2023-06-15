import { getSavedPostsAction } from "../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SavedPost from "../components/post/SavedPost";
import NoSavedPost from "../assets/nopost.jpg";

const Saved = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedPostsAction());
  }, [dispatch]);

  const savedPosts = useSelector((state) => state.posts?.savedPosts);

  return (
    <div className="main-section bg-white border">
      <div className="flex flex-col mb-3">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center border-b py-3">
          Your saved posts
        </h2>

        {savedPosts && savedPosts.length > 0 ? (
          <div className="flex flex-col items-center px-5 py-5 ">
            {savedPosts.reverse().map((post) => (
              <SavedPost key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center flex justify-center items-center flex-col">
            <p className="text-gray-500 py-5">
              You haven't saved any post yet.
            </p>
            <img loading="lazy" src={NoSavedPost} alt="no post" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
