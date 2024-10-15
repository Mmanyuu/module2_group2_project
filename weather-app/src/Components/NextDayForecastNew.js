import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./NextDayForecastNew.module.css"

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

// 24-Hour Forecast is an API from data.gov.sg, it does not require API key and it does not need any input othan than location, hency the useEffect hook has empty dependency array.

const NextDayForecastNew = () => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast"
        );

        // Upon a successful response, the data is logged to the console.
        console.log("Hourly Forecast Data:", response.data);

        // The specific path response.data.data.records[0].general accesses the necessary forecast information.
        setForecastData(response.data.data.records[0].general);
      } catch (err) {
        console.error("Error fetching hourly forecast:", err);
        setError(
          "Could not fetch hourly forecast. Please try again."
        );
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
  console.log ("this is forecast data",forecastData)

  return (
    <div>
      <h3>24-Hour Weather Forecast</h3>
      <div>
        <p>
          <strong>Low Temperature:</strong>{" "}
          {forecastData.temperature.low}°C
        </p>
        <p>
          <strong>High Temperature:</strong>{" "}
          {forecastData.temperature.high}°C
        </p>
        <p>
          <strong>Forecast:</strong> {forecastData.forecast.text}
        </p>
        {getWeatherIcon(forecastData.forecast.text)}
      </div>
    </div>
  );
};

export default NextDayForecastNew;
