import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./NextDayForecastNew.module.css";
import WeatherIcon from "./WeatherIcon";

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
        setError("Could not fetch hourly forecast. Please try again.");
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
  console.log("this is forecast data", forecastData);

  return (
    <>
      <div className={styles.forecastItem}>
          <p><span className={styles.spanColorPink}> {`{24hr Forecast} `}</span>
          <span className={styles.spanColorWhite}>{forecastData.forecast.text}</span>
          <span className={styles.spanColorPink}>{` {high} `}</span>
          <span className={styles.spanColorWhite}>{forecastData.temperature.high}°C</span>
          <span className={styles.spanColorPink}>{` {low} `}</span>
          <span className={styles.spanColorWhite}>{forecastData.temperature.low}°C</span></p>
      </div>
    </>
  );
};

export default NextDayForecastNew;
