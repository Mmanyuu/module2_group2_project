import React from "react";
import { ReactComponent as ClearDay } from "./images/clear-day.svg";
import { ReactComponent as Cloudy } from "./images/cloudy.svg";
import { ReactComponent as Rainy } from "./images/rain.svg";
import { ReactComponent as ThunderStormDay } from "./images/thunderstorms-rain.svg";
import { ReactComponent as Thunder } from "./images/thunderstorms.svg"; // Assuming this exists

const weatherIconStyles = {
  width: 150,
  height: 150,
};

const WeatherIcon = ({ forecastText }) => {
  const lowerCaseText = forecastText.trim().toLowerCase();

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
