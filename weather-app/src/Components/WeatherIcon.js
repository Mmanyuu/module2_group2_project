import React from "react";
import { ReactComponent as ClearDay } from "./images/clear-day.svg";
import { ReactComponent as Cloudy } from "./images/cloudy.svg";
import { ReactComponent as Rainy } from "./images/rain.svg";
import { ReactComponent as ThunderStormDay } from "./images/thunderstorms-rain.svg";
import { ReactComponent as Thunder } from "./images/thunderstorms.svg";

// const weatherIconStyles = {
//   width: "20vw", // 20% of viewport width
//   height: "30vh", // 30% of viewport height
//   maxWidth: "150px", // Cap the size at 150px
//   maxHeight: "150px",
// };

const WeatherIcon = ({ forecastText,width=20,height=30}) => {
  const lowerCaseText = forecastText.trim().toLowerCase();

  const weatherIconStyles = {
    width: `${width}px`,
    height: `${height}px`,
  }

  // Detect the forecast text and return the correct icon
  if (lowerCaseText.includes("fair") || lowerCaseText.includes("clear")) {
    return <ClearDay style={weatherIconStyles} />;
  } else if (
    lowerCaseText.includes("cloudy") ||
    lowerCaseText.includes("clouds")
  ) {
    return <Cloudy style={weatherIconStyles} />;
  } else if (lowerCaseText.includes("thundery")) {
    return <ThunderStormDay style={weatherIconStyles} />;
  } else if (
    lowerCaseText.includes("rain") ||
    lowerCaseText.includes("showers")
  ) {
    return <Rainy style={weatherIconStyles} />;
  } else if (lowerCaseText.includes("thunder")) {
    return <Thunder style={weatherIconStyles} />;
  } else {
    return <Cloudy style={weatherIconStyles} />; // Default icon
  }
};

export default WeatherIcon;
