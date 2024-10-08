import React, { useEffect, useState } from "react";
import axios from "axios";

// 24-Hour Forecast is an API from data.gov.sg, it does not require API key and it does not need any input othan than location, hency the useEffect hook has empty dependency array.
const NextDayForecast = () => {
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
      </div>
    </div>
  );
};

export default NextDayForecast;
