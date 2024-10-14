// PersonalisedInfo.js - component to show personalised weather info using initial user inputs

import { useContext, useEffect, useState } from "react";
import { ResponsesContext } from "../Context/ResponsesContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import styles from "./PersonalisedInfo.module.css";
import GeoCoordinates from "./GeoCoordinates"; // Import the GeoCoordinates function
import FormTwo from "./FormTwo";

function Button({ label, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}

function PersonalisedInfo() {
  const [loading, setLoading] = useState(false);
  const { usersData } = useContext(ResponsesContext); // Get usersData from context
  const [personaliseData, setPersonaliseData] = useState({});
  const [latestUser, setLatestUser] = useState(null); // Initial state as null
  const [isListVisible, setIsListVisible] = useState(false);

  const navigate = useNavigate();

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

          // Set personaliseData object and define the key at the end to be either home or office
          setPersonaliseData((prevData) => ({
            ...prevData,
            [key]: response.data,
          }));
        } catch (err) {
          console.error(
            `Error fetching weather data for ${location}`,
            err
          );
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

  const handleShowList = () => {
    setIsListVisible((isListVisible) => !isListVisible);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userData"); // Clear user data from sessionStorage
    setLatestUser([]); // Clear context data if necessary
    navigate("/"); // Redirect to the Introduction page
  };

  return (
    <div className={styles.personaliseBox}>
      <div className={styles.personaliseContainer}>
        {latestUser ? (
          <>
            <div>
              <h2>Hi! {latestUser.name}</h2>
              {/* -------------------------------------------------------------------------------------------------------------- */}
              {/* this is added for integrate testing purpose. CAn rephrase and render it based on the plannedActivity values 'yes' or 'no'*/}
              <h4>{latestUser.plannedActivity} , there is a planned activity </h4>
              <label> '{latestUser.activityDetails}'  at '{latestUser.activityLocation}' today</label>
              
              {/* ------------------------------------------------------------------------------------------------------------------ */}
            </div>

            {loading ? (
              <p>Loading weather data...</p>
            ) : (
              <>
                {/* Display home weather data */}
                {personaliseData.homeWeather ? (
                  <div className={styles.homeContainer}>
                    <h4>Home Weather: {latestUser.homeLocation}</h4>
                    <p>
                      Weather:{" "}
                      {
                        personaliseData.homeWeather.weather[0]
                          .description
                      }
                    </p>
                    <p>
                      Temperature:{" "}
                      {Math.round(
                        personaliseData.homeWeather.main.temp
                      )}
                      °C
                    </p>
                    <p>
                      Feels like:{" "}
                      {Math.round(
                        personaliseData.homeWeather.main.feels_like
                      )}
                      °C
                    </p>
                    <p>
                      Humidity:{" "}
                      {personaliseData.homeWeather.main.humidity}%
                    </p>
                    <p>
                      Wind Speed:{" "}
                      {personaliseData.homeWeather.wind.speed} m/s
                    </p>
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
                    <h4>Work Weather: {latestUser.workLocation}</h4>
                    <p>
                      Weather:{" "}
                      {
                        personaliseData.workWeather.weather[0]
                          .description
                      }
                    </p>
                    <p>
                      Temperature:{" "}
                      {Math.round(
                        personaliseData.workWeather.main.temp
                      )}
                      °C
                    </p>
                    <p>
                      Feels like:{" "}
                      {Math.round(
                        personaliseData.workWeather.main.feels_like
                      )}
                      °C
                    </p>
                    <p>
                      Humidity:{" "}
                      {personaliseData.workWeather.main.humidity}%
                    </p>
                    <p>
                      Wind Speed:{" "}
                      {personaliseData.workWeather.wind.speed} m/s
                    </p>
                  </div>
                ) : (
                  <p>
                    Could not fetch weather data for{" "}
                    {latestUser.workLocation}.
                  </p>
                )}
              </>
            )}
          </>
        ) : (
          <p>No users added yet</p>
        )}
      </div>
      <Button label={isListVisible ? "Hide" : "Add Activity"} onClick={handleShowList} />
      {isListVisible && <FormTwo />}
      {!isListVisible && <p>Click 'Add Activity' When you have plan.</p>}
      {/* {isEditing && <FormTwo />} */}
      {/* <button className={styles.updateButton}>
        Update Information
      </button> */}
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default PersonalisedInfo;