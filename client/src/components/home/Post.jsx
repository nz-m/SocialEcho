import React from "react";
const Post = ({
  username,
  avatarUrl,
  community,
  postTime,
  content,
  imageUrl,
  likes,
  dislikes,
}) => {
  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        <img
          src={
            "https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg"
          }
          alt={`Nz's avatar`}
          style={{ width: "50px", height: "50px" }}
        />
        <div>
          <p>John Doe</p>
          <p>Education</p>
          <p>12/12/2021</p>
        </div>
      </div>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin</p>
        <img
          src={
            "https://a-static.besthdwallpaper.com/alone-in-unknown-world-wallpaper-1600x900-33874_47.jpg"
          }
          alt={`Nz's avatar`}
          style={{
            width: "60%",
            height: "60%",
          }}

          // add slow loading image
        />
        <div>
          <p>Likes: 2</p>
          <p>Dislikes: 3</p>
          <p>Report</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
