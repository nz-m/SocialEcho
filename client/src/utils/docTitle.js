export const getTitleFromRoute = (path) => {
  if (/^\/user\/\w+$/.test(path)) {
    return "User Profile | SocialEcho";
  } else if (/^\/post\/\w+$|^\/my\/post\/\w+$/.test(path)) {
    return "Post | SocialEcho";
  } else if (/^\/community\/\w+$/.test(path)) {
    return "Community | SocialEcho";
  } else if (/^\/community\/\w+\/report$/.test(path)) {
    return "Report Post | SocialEcho";
  } else if (/^\/community\/\w+\/reported-post$/.test(path)) {
    return "Reported Post | SocialEcho";
  } else if (/^\/community\/\w+\/moderator$/.test(path)) {
    return "Moderator Panel | SocialEcho";
  } else if (path === "/signin") {
    return "Sign In | SocialEcho";
  } else if (path === "/signup") {
    return "Sign Up | SocialEcho";
  } else if (path === "/" || path === "/home") {
    return "News Feed | SocialEcho";
  } else if (path === "/profile") {
    return "User Profile | SocialEcho";
  } else if (path === "/saved") {
    return "Saved Posts | SocialEcho";
  } else if (path === "/edit-profile") {
    return "Edit Profile | SocialEcho";
  } else if (path === "/communities") {
    return "Communities | SocialEcho";
  } else if (path === "/my-communities") {
    return "My Communities | SocialEcho";
  } else if (path === "/following") {
    return "Following | SocialEcho";
  } else if (path === "/devices-locations") {
    return "Devices Locations | SocialEcho";
  } else if (path === "/verify-email") {
    return "Verify Email | SocialEcho";
  } else if (path === "/email-verified") {
    return "Email Verified | SocialEcho";
  } else if (path === "/block-device") {
    return "Block Device | SocialEcho";
  } else if (path === "/login-verified") {
    return "Login Verified | SocialEcho";
  } else {
    return "SocialEcho";
  }
};
