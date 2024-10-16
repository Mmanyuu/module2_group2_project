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

// import Form from "./Form";
// import FormTwo from "./FormTwo";
// import Form from "./Form";
// import ViewList from "./ViewList";

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

  // const [isListVisible, setIsListVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const navigate = useNavigate();

  //putting the quote at personalised data and come out when the person sign in
  const [randomQuote, setRandomQuote] = useState("");

  // Create a use State for Show / Hide FormButton
  // const [isEditing, setIsEditing] = useState(false);

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

  // const handleShowList = () => {
  //   setIsListVisible((isListVisible) => !isListVisible);
  // };

  const handleLogout = () => {
    sessionStorage.removeItem("userData"); // Clear user data from sessionStorage
    setLatestUser([]); // Clear context data if necessary
    navigate("/"); // Redirect to the Introduction page
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
              <h2 className={styles.userName}>Hello, {latestUser.name},</h2>
              <p className={styles.quotes}>{`{ ${randomQuote} }`}</p>
              <div className={styles.activities}>
                {/* -------------------------------------------------------------------------------------------------------------- */}
                {/* this is added for integrate testing purpose. CAn rephrase and render it based on the plannedActivity values 'yes' or 'no'*/}

                <h4>
                  {latestUser.plannedActivity} , there is a planned activity{" "}
                </h4>
                <label>
                  {" "}
                  '{latestUser.activityDetails}' at '
                  {latestUser.activityLocation}' today
                </label>

                {/* ------------------------------------------------------------------------------------------------------------------ */}
              </div>
              <FormThree />
            </div>
            

            <div className={styles.flexContainer}>
              {loading ? (
                <p>Loading weather data...</p>
              ) : (
                <>
                  {/* Display home weather data */}
                  {personaliseData.homeWeather ? (
                    <div className={styles.homeContainer}>
                      <h4>{`{Home}`}</h4>
                      <h2>{latestUser.homeLocation} </h2>

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
                        ...Feels like:{" "}
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
                      <h3>{`{Work} ${Math.round(
                        personaliseData.workWeather.main.temp
                      )}°C ${latestUser.workLocation}`}</h3>
                    </div>
                  ) : (
                    <p>
                      Could not fetch weather data for {latestUser.workLocation}
                      .
                    </p>
                  )}
                </>
              )}
              <div className={styles.forcastPosition}><NextDayForecastNew /></div>
            </div>
          </>
        ) : (
          <p>No users added yet</p>
        )}
      </div>

      {/* <h2>Your Activity Forecast:</h2> */}
      {/* <FormThree /> */}

      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>

      {/* <Form /> */}
      {/* <FormThree /> */}
      {/* <ViewList /> */}
      {/* <FormTwo /> */}
      {/* <Button label={isListVisible ? "Hide" : "Add Activity"} onClick={handleShowList} />
        {/* <h2>Your Activity Forecast:</h2> */}
      {/* <ViewList /> */}
      {/* <FormTwo /> */}
      {/* <Form /> */}
      {/* <Button label={isListVisible ? "Hide" : "Add Activity"} onClick={handleShowList} />
        {isListVisible && <FormTwo />}
        {!isListVisible && <p>Click 'Add Activity' When you have plan.</p>} */}
      {/* {isEditing && <FormTwo />} */}
      {/* <button className={styles.updateButton}>
        Update Information
      </button> */}
    </div>
  );
}

export default PersonalisedInfo;
