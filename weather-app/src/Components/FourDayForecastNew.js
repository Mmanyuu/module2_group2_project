import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./FourDayForecastNew.module.css";

//import svg log as react component
import { ReactComponent as ClearDay } from "./images/clear-day.svg";
import { ReactComponent as Cloudy } from "./images/cloudy.svg";
import { ReactComponent as Rainy } from "./images/rain.svg";
import { ReactComponent as ThunderStormDay } from "./images/thunderstorms-rain.svg";
import { ReactComponent as Thunder } from "./images/thunderstorms.svg";

// Function to show the correct weather icon based on forecast text
const getWeatherIcon = (forecastText) => {
  const lowerCaseText = forecastText.trim().toLowerCase();

  // detecting forecast text to determine what image to use.
  if (lowerCaseText.includes("fair") || lowerCaseText.includes("clear")) {
    return <ClearDay className={styles.weatherIcon} />;
  } else if (
    lowerCaseText.includes("partly cloudy") ||
    lowerCaseText.includes("cloudy")
  ) {
    return <Cloudy className={styles.weatherIcon} />;
  } else if (lowerCaseText.includes("rain")) {
    return <Rainy className={styles.weatherIcon} />;
  } else if (lowerCaseText.includes("thundery")) {
    return <ThunderStormDay className={styles.weatherIcon} />;
  } else if (lowerCaseText.includes("thunder")) {
    return <Thunder className={styles.weatherIcon} />;
  } else {
    return <Cloudy className={styles.weatherIcon} />; // Default icon
  }
};

// Four Day Forecast is an API from data.gov.sg, it does not require API key and it does not need any input othan than location, hency the useEffect hook has empty dependency array.
const FourDayForecastNew = () => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-open.data.gov.sg/v2/real-time/api/four-day-outlook"
        );

        console.log("Four Day Forecast Data:", response.data);

        // Store the forecast data for the next four days
        setForecastData(response.data.data.records[0].forecasts);
      } catch (err) {
        console.error("Error fetching four-day forecast:", err);
        setError("Could not fetch four-day forecast. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Four Day Weather Forecast</h3>
      <div className={styles.forecastRow}>
        {forecastData.map((forecast, index) => (
          <div key={index} className={styles.forecastItem}>
            <strong>Date:</strong> {forecast.day} <br />
            <strong>Low Temperature:</strong> {forecast.temperature.low}°C{" "}
            <br />
            <strong>High Temperature:</strong> {forecast.temperature.high}°C{" "}
            <br />
            <strong>Forecast:</strong> {forecast.forecast.text}
            <br />
            {getWeatherIcon(forecast.forecast.text)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FourDayForecastNew;
