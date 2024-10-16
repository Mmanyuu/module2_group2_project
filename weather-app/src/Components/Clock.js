import { useState, useEffect } from "react";

const clockStyle = {
  margin: 0,
};

function Clock() {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Convert the timestamp to a 24-hour time format
  const formattedTime = new Date(time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return <p style={clockStyle}>{formattedTime}</p>;
}

export default Clock;
