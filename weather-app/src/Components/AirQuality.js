import React, { useState, useEffect } from "react";
import axios from "axios";

// Air quality API from openweathermap.org, it uses the coordinates from GeoCoordinates.js and API key as input to fetch the data

function AirQuality({ lat, long }) {
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // The useEffect hook is used to fetch air quality data whenever the lat (latitude) or long (longitude) props change.
  useEffect(() => {
    const fetchAirQualityData = async () => {
      if (!lat || !long) return; // Early return if coordinates are missing

      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${apiKey}`;

      try {
        setLoading(true);
        const response = await axios.get(airQualityUrl);
        setAirQualityData(response.data);
        setError(false);
      } catch (err) {
        console.error("Error fetching air quality data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    // After defining the fetchAirQualityData function, it is immediately invoked to initiate the fetching process when the effect runs. This means that the air quality data will be fetched as soon as valid latitude and longitude values are provided.
    fetchAirQualityData();
  }, [lat, long]);

  // switch statement is used to present the different air quality level
  const getAQIDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return <p>Loading air quality data...</p>;
  }

  if (error) {
    return <p>Error fetching air quality data.</p>;
  }

  if (!airQualityData) {
    return <p>No air quality data available.</p>;
  }

  // these are the end points of the API
  const { aqi } = airQualityData.list[0].main;
  const { o3, pm2_5, pm10 } = airQualityData.list[0].components;

  return (
    <div>
      <h3>Air Quality</h3>
      <p>{getAQIDescription(aqi)} </p>
      <div>
        <div>
          <strong>O₃ (Ozone):</strong> {o3} µg/m³
        </div>
        <div>
          <strong>PM₂.₅:</strong> {pm2_5} µg/m³
        </div>
        <div>
          <strong>PM₁₀:</strong> {pm10} µg/m³
        </div>
      </div>
    </div>
  );
}

export default AirQuality;
