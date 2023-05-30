import { useState, useEffect } from "react";

const CurrentTime = () => {
  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const date = new Date(time);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const amPm = date.getHours() >= 12 ? "PM" : "AM";
  const timeString = `${hours}:${minutes}:${seconds} ${amPm}`;

  return (
    <div className="text-sm text-gray-800 mt-1">
      {`${weekday}, ${month} ${day}, ${year} ${timeString}`}
    </div>
  );
};

export default CurrentTime;
