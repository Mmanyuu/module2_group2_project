import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./FourDayForecastNew.module.css";
import WeatherIcon from "./WeatherIcon";

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
      <div className={styles.forecastRow}>
        {forecastData.map((forecast, index) => (
          <div key={index} className={styles.forecastItem}>
            <strong>{forecast.day} </strong> <br />
            <strong>{forecast.forecast.text}</strong> <br />
            <WeatherIcon forecastText={forecast.forecast.text} />
            <br />
            <p className={styles.temperaturePosition}>
              {forecast.temperature.high}°C
            </p>
            <p className={styles.temperaturePosition}>
              {forecast.temperature.low}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FourDayForecastNew;
