import React from "react";
import ModeratorProfile from "../components/moderator/ModeratorProfile";
import Leftbar from "../components/home/LeftBar";
import RightBar from "../components/community/RightBar";
const Moderator = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
              <Leftbar />
            </div>
            <div className="col-span-8">
              <ModeratorProfile
                name="John Doe"
                email="johndoe@example.com"
                password="********"
                role="Moderator"
                joinedDate="January 1, 2022"
              />
               here goes the settings for the moderator to add/delete new
              rules and guidelines, and to add/delete new moderators // see
              reported posts and comments and delete them if necessary // see
              the list of members and delete them if necessary
            </div>
            <div className="col-span-2">
              <RightBar
                totalMembers={100}
                moderators={["Jane Smith", "Alex Johnson", "Chris Lee"]}
                guidelines="Be respectful and follow the community rules."
                about="This community is for discussing all things related to technology."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moderator;
