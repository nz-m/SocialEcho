import { useNightMode } from "../../context/NightModeContext";

const OwnInfoCard = ({ user }) => {
  const {Night} = useNightMode()
  return (
    <div className={Night ?"bg-slate-800 rounded-md p-6 space-y-2 my-5 text-white":"bg-white rounded-md border p-6 space-y-2 my-5" }>
      <div className="flex flex-wrap items-center justify-between">
        <h3 className={Night ? "text-lg font-medium text-gray-200" : "text-lg font-medium text-gray-800"}>Profile Summary</h3>
        <div className={Night ? "text-sm text-white" : "text-sm text-gray-500"}>
          Joined {user.duration} ago (
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          )
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between text-sm">
        <div className={Night ? "text-white" : "text-gray-500" }>Total Posts</div>
        <div className={Night ? "font-medium text-white" : "font-medium text-gray-800"}>{user.totalPosts}</div>
      </div>
      <div className="flex flex-wrap items-center justify-between text-sm">
        <div className={Night ? "text-white" : "text-gray-500" }>Total Communities</div>
        <div className={Night ? "font-medium text-white" : "font-medium text-gray-800"}>{user.totalCommunities}</div>
      </div>
      {user.totalPosts > 0 && (
        <div className="flex flex-wrap items-center justify-between text-sm">
          <div className={Night ? "text-white" : "text-gray-500" }>Posts in Communities</div>
          <div className={Night ? "font-medium text-white" : "font-medium text-gray-800"}>
            {user.totalPosts} in {user.totalPostCommunities}{" "}
            {user.totalPostCommunities === 1 ? "community" : "communities"}
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between text-sm">
        <div className={Night ? "text-white" : "text-gray-500" }>Followers</div>
        <div className={Night ? "font-medium text-white" : "font-medium text-gray-800"}>
          {user.followers?.length ?? 0}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between text-sm">
        <div className={Night ? "text-white" : "text-gray-500"}>Following</div>
        <div className={Night ? "font-medium text-white" : "font-medium text-gray-800"}>
          {user.following?.length ?? 0}
        </div>
      </div>
    </div>
  );
};

export default OwnInfoCard;
