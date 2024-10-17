// PersonalisedInfo.js - component to show personalised weather info using initial user inputs
import styles from "./PersonalisedInfo.module.css";
import { useContext, useEffect, useState } from "react";
import { ResponsesContext } from "../Context/ResponsesContext";
import { Link, useNavigate } from "react-router-dom";
import { fetchRandomQuoteForWeather } from "./RandomQuotes";
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import GeoCoordinates from "./GeoCoordinates"; // Import the GeoCoordinates function
import FormThree from "./FormThree";
import Clock from "./Clock";
import WeatherIcon from "./WeatherIcon";
import NextDayForecastNew from "./NextDayForecastNew";
import FormFour from "./FormFour";
import FourDayForecastNew from "./FourDayForecastNew";

// import Form from "./Form";
// import FormTwo from "./FormTwo";
// import Form from "./Form";
// import ViewListTwo from "./ViewListTwo";

// function Button({ label, onClick }) {
//   return (
//     <button className={styles.button} onClick={onClick}>
//       {label}
//     </button>
//   );
// }

function PersonalisedInfo() {
  const [loading, setLoading] = useState(false);
  const { usersData } = useContext(ResponsesContext); // Get usersData from context
  const [personaliseData, setPersonaliseData] = useState({});
  const [latestUser, setLatestUser] = useState(null); // Initial state as null
  const [showFourDayForecast, setShowFourDayForecast] = useState(false);
  const navigate = useNavigate();

  //putting the quote at personalised data and come out when the person sign in
  const [randomQuote, setRandomQuote] = useState("");
  // const [isListVisible, setIsListVisible] = useState(false);
  // const [isListVisible, setIsListVisible] = useState(false);
  // const navigate = useNavigate();
  // Create a use State for Show / Hide FormButton
  // const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (usersData.length > 0) {
      // Set latest user whenever usersData is updated
      const user = usersData[usersData.length - 1];
      setLatestUser(user);

      // we can do refractor on tge following to use data from WeatherData.js for nowi only know how to use the exact same info from andrew. :(
      // encodeURIComponent to ensure location by the user input are passed safely and correctly fomated

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

  const handleForecastToggle = () => {
    setShowFourDayForecast((prev) => !prev);
  };

  return (
    <div>
      <div>
        {latestUser ? (
          <>
            <div className={styles.gridContainer}>
              {/* First Grid */}
              <div className={styles.clock}>
                <Clock />
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
                <FormThree />
                {/* Logout Button */}
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>

              {/* Second Grid */}
              <div className={styles.flexContainer}>
                {loading ? (
                  <p>Loading weather data...</p>
                ) : (
                  <>
                    {/* Display home weather data */}
                    {personaliseData.homeWeather ? (
                      <div className={styles.homeContainer}>
                        <div>
                          <span
                            className={styles.spanColorPink}
                          >{`{HOME}`}</span>
                          <br />
                          <br />
                          <span className={styles.homeLocation}>
                            {capitalizeFirstLetter(latestUser.homeLocation)}
                          </span>
                          <br />
                          <br />
                          <span className={styles.otherInfoPosition}>
                            {`{ ${personaliseData.homeWeather.weather[0].description}`}{" "}
                            <br />
                            {`Humidity ${personaliseData.homeWeather.main.humidity}`}{" "}
                            <br />
                            {`Wind Speed ${personaliseData.homeWeather.wind.speed} m/s }`}
                          </span>
                        </div>

                        <div className={styles.temperatureContainer}>
                          <span className={styles.weatherIconPosition}>
                            <WeatherIcon
                              forecastText={
                                personaliseData.homeWeather.weather[0]
                                  .description
                              }
                              width={160}
                              height={160}
                            />
                          </span>
                          <p>
                            <span className={styles.highTempPosition}>
                              {Math.round(
                                personaliseData.homeWeather.main.temp
                              )}
                              °C
                            </span>
                            <span className={styles.feelsPosition}>
                              ...Feels like{" "}
                              {Math.round(
                                personaliseData.homeWeather.main.feels_like
                              )}
                              °C
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p>
                        Could not fetch weather data for{" "}
                        {latestUser.homeLocation}.
                      </p>
                    )}

                    {/* Display work weather data */}
                    {personaliseData.workWeather ? (
                      <div className={styles.workContainer}>
                        <p className={styles.workWeatherPosition}>
                          <span
                            className={styles.spanColorPink}
                          >{`{WORK} `}</span>

                          <span>
                            <WeatherIcon
                              forecastText={
                                personaliseData.workWeather.weather[0]
                                  .description
                              }
                              width={60}
                              height={60}
                            />
                          </span>

                          <span
                            className={`${styles.spanColorPink} ${styles.spanFontBig}`}
                          >
                            {" "}
                            {`${personaliseData.workWeather.weather[0].description} `}
                            {Math.round(personaliseData.workWeather.main.temp)}
                            °C{" "}
                          </span>
                          <span
                            className={`${styles.spanColorwhite} ${styles.spanFontBig}`}
                          >
                            {capitalizeFirstLetter(latestUser.workLocation)}
                          </span>
                        </p>
                        <div>
                          <NextDayForecastNew />
                        </div>
                        <div>
                          {/* Using react link and outlet to displayfour day forecast */}
                          <Link
                            to="#"
                            onClick={handleForecastToggle}
                            className={styles.forecastLink}
                          >
                            {showFourDayForecast
                              ? "- Hide 4-Day Forecast"
                              : "+ View 4-Day Forecast"}
                          </Link>

                          {/* Conditionally Render Four-Day Forecast */}
                          {showFourDayForecast && (
                            <div className={styles.forecastOutlet}>
                              <FourDayForecastNew />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p>
                        Could not fetch weather data for{" "}
                        {latestUser.workLocation}.
                      </p>
                    )}
                  </>
                )}
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
