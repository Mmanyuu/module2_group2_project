import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsesContext } from "../Context/ResponsesContext";
import styles from "./Introduction.module.css";

const Introduction = () => {
  const navigate = useNavigate();
  const { setUsersData } = useContext(ResponsesContext);

  const [name, setName] = useState("");
  const [homeLocation, setHomeLocation] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [hasActivity, setHasActivity] = useState("");
  const [activityDetails, setActivityDetails] = useState("");
  const [activityLocation, setActivityLocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: Date.now().toString(), // Generate a unique ID
      name,
      homeLocation,
      workLocation,
      plannedActivity: hasActivity,
      activityDetails: hasActivity === "yes" ? activityDetails : "",
      activityLocation: hasActivity === "yes" ? activityLocation : "",
    };

    setUsersData((prevUsers) => [...prevUsers, newUser]);

    // Store user data in sessionStorage
    sessionStorage.setItem("userData", JSON.stringify(newUser));

    // Navigate to MainPage with user data
    navigate("/MainPage", { state: { user: newUser } });
  };

  return (
    <div className={styles.container}>
      <p>
        Ah, so you stumble upon this random weather app. <br />
        well, since you are here, <br />
        why don't you tell us a bit about yourself.
      </p>

      <form onSubmit={handleSubmit}>
        <p>
          How should we address you? <br />
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Your Name"
            required
          />
        </p>
        <p>
          Area of residence? <br />
          <input
            type="text"
            value={homeLocation}
            onChange={(e) => {
              setHomeLocation(e.target.value);
            }}
            placeholder="Your Area"
            required
          />
        </p>
        <p>
          How about your school or work location?<br/>
          <input
            type="text"
            value={workLocation}
            onChange={(e) => {
              setWorkLocation(e.target.value);
            }}
            placeholder="Your School/Work Location"
            required
          />
        </p>
        <p>
          Do you have any activities planned tomorrow that rely on the weather,
          like a picnic or sports?
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            checked={hasActivity === "yes"}
            onChange={(e) => {
              setHasActivity(e.target.value);
            }}
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            value="no"
            checked={hasActivity === "no"}
            onChange={(e) => {
              setHasActivity(e.target.value);
            }}
          />{" "}
          No
        </label>
        {hasActivity === "yes" && (
          <>
            <p>
              If yes, tell us what activity you have planned: <br />
              <input
                type="text"
                value={activityDetails}
                onChange={(e) => {
                  setActivityDetails(e.target.value);
                }}
                placeholder="Activity"
                required
              />
            </p>
            <p>
              Where will this activity take place? <br />
              <input
                type="text"
                value={activityLocation}
                onChange={(e) => {
                  setActivityLocation(e.target.value);
                }}
                placeholder="Location"
                required
              />
            </p>
          </>
        )}
        <p>
          Alright, all set. Let’s get something just for you on the click of
          submit.
        </p>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default Introduction;
