// PersonalisedInfo.js - component to show personalised weather info using initial user inputs

import { useContext, useEffect, useState } from "react";
import { ResponsesContext } from "../Context/ResponsesContext";
import { useNavigate } from "react-router-dom";
import { fetchRandomQuoteForWeather } from "./RandomQuotes";

import axios from "axios";
import styles from "./PersonalisedInfo.module.css";
import GeoCoordinates from "./GeoCoordinates"; // Import the GeoCoordinates function
import FormThree from "./FormThree";
import Clock from "./Clock";
import WeatherIcon from "./WeatherIcon";
import NextDayForecastNew from "./NextDayForecastNew";

function PersonalisedInfo() {
  const [loading, setLoading] = useState(false);
  const { usersData } = useContext(ResponsesContext); // Get usersData from context
  const [personaliseData, setPersonaliseData] = useState({});
  const [latestUser, setLatestUser] = useState(null); // Initial state as null
  const navigate = useNavigate();

  //putting the quote at personalised data and come out when the person sign in
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    if (usersData.length > 0) {
      // Set latest user whenever usersData is updated
      const user = usersData[usersData.length - 1];
      setLatestUser(user);

      const fetchPersonaliseData = async (location, key) => {
        try {
          // Fetch coordinates first
          const { lat, lon } = await GeoCoordinates(location);

          // Use the fetched coordinates to get weather data
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
          const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

          setLoading(true);
          const response = await axios.get(weatherUrl);
          console.log(`Weather for ${location}`, response.data);

          const quote = fetchRandomQuoteForWeather(response.data);
          setRandomQuote(quote);

          // Set personaliseData object and define the key at the end to be either home or office
          setPersonaliseData((prevData) => ({
            ...prevData,
            [key]: response.data,
          }));
        } catch (err) {
          console.error(`Error fetching weather data for ${location}`, err);
          setPersonaliseData((prevData) => ({
            ...prevData,
            [key]: null,
          })); // Clear previous data on error
        } finally {
          setLoading(false);
        }
      };

      // Fetch weather data for home and work locations
      fetchPersonaliseData(user.homeLocation, "homeWeather");
      fetchPersonaliseData(user.workLocation, "workWeather");
    }
  }, [usersData]);

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    setLatestUser(null);
    navigate("/");
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      <div className={styles.gridContainer}>
        {latestUser ? (
          <>
            <div>
              <div className={styles.clock}>
                <Clock />
              </div>

              <h2 className={styles.userName}>
                Hello {capitalizeFirstLetter(latestUser.name)},
              </h2>

              <p className={styles.quotes}>{`{ ${randomQuote} }`}</p>

              {/* Display of activity if any */}
              <div className={styles.activities}>
                {latestUser.plannedActivity === "yes" ? (
                  <>
                    <h4>Planned Activity:</h4>
                    <p>{`${latestUser.activityDetails} at ${latestUser.activityLocation} today.`}</p>
                  </>
                ) : (
                  <h4>No planned activity today.</h4>
                )}
              </div>
              {/* Logout Button */}
              <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>

            {/* <FormThree /> */}

            <div className={styles.flexContainer}>
              {loading ? (
                <p>Loading weather data...</p>
              ) : (
                <>
                  {/* Display home weather data */}
                  {personaliseData.homeWeather ? (
                    <div className={styles.homeContainer}>
                      <h3>
                        <span className={styles.spanColorPink}>{`{HOME}`}</span>
                      </h3>
                      <h2>{capitalizeFirstLetter(latestUser.homeLocation)} </h2>

                      <p className={styles.weatherIconPosition}>
                        <WeatherIcon
                          forecastText={
                            personaliseData.homeWeather.weather[0].description
                          }
                        />
                      </p>
                      {"   "}
                      <p className={styles.highTempPosition}>
                        {Math.round(personaliseData.homeWeather.main.temp)}°C{" "}
                      </p>

                      <p className={styles.feelsPosition}>
                        ...Feels like{" "}
                        {Math.round(
                          personaliseData.homeWeather.main.feels_like
                        )}
                        °C
                      </p>

                      <div className={styles.otherInfoPosition}>
                        {`{ ${personaliseData.homeWeather.weather[0].description}`}{" "}
                        <br />
                        {`Humidity ${personaliseData.homeWeather.main.humidity}`}{" "}
                        <br />
                        {`Wind Speed ${personaliseData.homeWeather.wind.speed} m/s }`}
                      </div>
                    </div>
                  ) : (
                    <p>
                      Could not fetch weather data for {latestUser.homeLocation}
                      .
                    </p>
                  )}

                  {/* Display work weather data */}
                  {personaliseData.workWeather ? (
                    <div className={styles.workContainer}>
                      <p>
                        <span
                          className={styles.spanColorPink}
                        >{`{WORK} `}</span>
                        <span>{`${personaliseData.workWeather.weather[0].description} `}</span>

                        <span className={styles.smallWeatherIcon}></span>

                        <span
                          className={`${styles.spanColorPink} ${styles.spanFontBig}`}
                        >
                          {Math.round(personaliseData.workWeather.main.temp)}°C{" "}
                        </span>
                        <span
                          className={`${styles.spanColorwhite} ${styles.spanFontBig}`}
                        >
                          {capitalizeFirstLetter(latestUser.workLocation)}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p>
                      Could not fetch weather data for {latestUser.workLocation}
                      .
                    </p>
                  )}
                </>
              )}
              <div className={styles.forcastPosition}>
                <NextDayForecastNew />
              </div>
            </div>
          </>
        ) : (
          <p>No users added yet</p>
        )}
      </div>
    </div>
  );
}

export default PersonalisedInfo;
