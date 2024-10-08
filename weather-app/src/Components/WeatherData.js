import { useState, useEffect } from "react";
import axios from "axios";

// The WeatherData component fetches current weather data for a specified location based on geographical coordinates (longitude and latitude) from openweathermap.org API.

const WeatherData = ({ lon, lat, location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The useEffect hook is used to perform the side effect of fetching weather data when the component mounts or when the lon or lat props change
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!lon || !lat) return; // Early return if coordinates are missing

      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        setLoading(true);
        const response = await axios.get(weatherUrl);
        console.log("Weather Data:", response.data);
        setWeatherData(response.data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Could not fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // The function is called only if both lon and lat are provided, ensuring that a valid API call is made.
    if (lon && lat) {
      fetchWeatherData();
    }
  }, [lon, lat]);

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Weather in {capitalizeFirstLetter(location)}</h3>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
      <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>
        Rainfall in last hour:{" "}
        {weatherData.rain ? weatherData.rain["1h"] : 0} mm
      </p>
      <p>Cloudiness: {weatherData.clouds.all}%</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
    </div>
  );
};

export default WeatherData;
