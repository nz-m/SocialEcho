/**
 * Formats a date string in the format of "Month Dayst/nd/rd/th, Year Hour:Minute AM/PM".
 * @param {string} createdAt - The date string to format (in ISO format).
 * @returns {string} The formatted date string.
 * @example
 * formatCreatedAt("2023-04-18T13:22:43.115+00:00");
 * // returns "April 18th, 2023 7:22 PM"
 */
const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const dateString = date.toLocaleDateString("en-US", options);
  const day = date.getDate();
  let suffix;
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  return (
    dateString.split(",")[0] +
    suffix +
    ", " +
    date.getFullYear() +
    " " +
    timeString
  );
};

module.exports = formatCreatedAt;
