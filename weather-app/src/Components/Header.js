import { useState } from "react";
import styles from "./Header.module.css"; // Import CSS module
import GeoCoordinates from "./GeoCoordinates"; // Import GeoCoordinates



// Header consists of app title, an input form, and a real-time clock.


function Header() {
  const [location, setLocation] = useState(""); // Stores user input location
  const [displayLocation, setDisplayLocation] = useState(""); // Stores the location for display
  const [weatherData, setWeatherData] = useState(null); // Stores fetched weather data
  const [error, setError] = useState(null); // Stores any errors during the fetch

  // Updates the location state with the input field's value.
  const handlerInputChange = (event) => {
    setLocation(event.target.value);
  };

  // Handles search submission and fetches coordinates and weather data.
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent page reload.
    if (!location.trim()) {
      alert("Please enter a valid location");
      return;
    }

    // Clear previous data before fetching new data
    setWeatherData(null);
    setError(null);
    setDisplayLocation(""); // Clear display location for new data

    try {
      // Fetch coordinates using GeoCoordinates.
      const { lon, lat } = await GeoCoordinates(location);

      // Fetch weather data using OpenWeather API based on the coordinates.
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data); // Store the fetched weather data.
        setDisplayLocation(location); // Store the input location for display.
        setError(null); // Clear any previous error.
      } else {
        throw new Error(data.message);
      }

      setLocation(""); // Clear the input field.
    } catch (error) {
      console.error("Error:", error);
      setError("Could not fetch weather data. Please try again.");
      setWeatherData(null); // Clear any previous data.
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className={styles.headerContainer}>
      <p className={styles.nimbusLogo}>NimbusNow</p>
      <form className={styles.searchBox} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Check current weather across Singapore"
          value={location}
          onChange={handlerInputChange}
        />
        <button type="submit" className={styles.searchButton}>
          GET
        </button>
      </form>
      {/* Display weather data or error messages dynamically */}
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : weatherData ? (
        <div className={styles.weatherDataCarousel}>
          <div className={styles.weather_slide}>
            <div>
              <strong>
                {capitalizeFirstLetter(displayLocation)}
              </strong>{" "}
              -{" "}
              {capitalizeFirstLetter(
                weatherData.weather[0].description
              )}
            </div>
            <div>
              Temperature: {Math.round(weatherData.main.temp)}°C
            </div>
            <div>
              Feels like: {Math.round(weatherData.main.feels_like)}°C
            </div>
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Wind Speed: {weatherData.wind.speed} m/s</div>
          </div>

          {/* Duplicate the content for infinite effect */}
          <div className={styles.weather_slide}>
            <div>
              <strong>
                {capitalizeFirstLetter(displayLocation)}
              </strong>{" "}
              -{" "}
              {capitalizeFirstLetter(
                weatherData.weather[0].description
              )}
            </div>
            <div>
              Temperature: {Math.round(weatherData.main.temp)}°C
            </div>
            <div>
              Feels like: {Math.round(weatherData.main.feels_like)}°C
            </div>
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Wind Speed: {weatherData.wind.speed} m/s</div>
          </div>
        </div>
      ) : null} {/* Render nothing if there's no data or error */}
    </div>
  );
}

export default Header;
