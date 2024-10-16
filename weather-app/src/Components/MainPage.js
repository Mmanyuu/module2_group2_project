import React, { useState } from "react";
import Header from "./Header";
import WeatherData from "./WeatherData";
import AirQuality from "./AirQuality";
import GeoCoordinates from "./GeoCoordinates";
import PersonalisedInfo from "./PersonalisedInfo";
import styles from "./MainPage.module.css";
import { Link } from "react-router-dom";
import FourDayForecastNew from "./FourDayForecastNew";

const MainPage = () => {
  const [coords, setCoords] = useState({ lon: null, lat: null });
  const [location, setLocation] = useState("");
  const [showFourDayForecast, setShowFourDayForecast] = useState(false);

  // This asynchronous function is called when a user submits a location from the Header component.

  // 1) It first updates the location state with the locationInput provided.
  // 2) It then attempts to fetch the geographical coordinates using the GeoCoordinates function, passing the locationInput.
  // 3) If successful, it updates the coords state with the retrieved lon and lat.
  // 4) If an error occurs during the fetch (e.g., invalid location), it logs the error to the console and displays an alert.
  const handleSearch = async (locationInput) => {
    setLocation(locationInput);
    try {
      // Fetch coordinates using GeoCoordinates
      const { lon, lat } = await GeoCoordinates(locationInput);
      setCoords({ lon, lat }); // Store the coordinates
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Could not fetch coordinates. Please check the location and try again."
      );
    }
  };

  const handleForecastToggle = () => {
    setShowFourDayForecast((prev) => !prev);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/*Personal Information - grid 1 [column]*/}
      <div className={styles.personaliseBox}>
        <PersonalisedInfo />
        <Header onSearch={handleSearch} />
        {coords.lon && coords.lat && (
          <>
            <WeatherData
              lon={coords.lon}
              lat={coords.lat}
              location={location}
            />
            <AirQuality lat={coords.lat} long={coords.lon} />
          </>
        )}
      </div>

      {/*Weather Data and Search Header - grid 2 [column]*/}
      <div className={styles.header}>
        {/* Using react link and outlet to displayfour day forecast */}
        <div className={styles.forecastLink}>
          <Link to="#" onClick={handleForecastToggle}>
            {showFourDayForecast
              ? "- Hide 4-Day Forecast"
              : "+ View 4-Day Forecast"}
          </Link>
        </div>

        {/* Conditionally Render Four-Day Forecast */}
        {showFourDayForecast && (
          <div className={styles.forecastOutlet}>
            <FourDayForecastNew />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
