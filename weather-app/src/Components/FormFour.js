// https://codepen.io/Hafoux/pen/ZEOwzdQ
// https://dev.to/aryclenio/unidirectional-and-bidirectional-data-flow-the-ultimate-front-end-interview-questions-guide-pt-1-5cnc
// React Unidirectional Data Flow

import { useState } from "react";

const NameForm = () => {
  // Activity Default State
  const [inputactivity, setInputActivity] = useState("");
  const [activity, setActivity] = useState("Badminton");

  // Location Default State
  const [inputlocation, setInputLocation] = useState("");
  const [location, setLocation] = useState("Badminton");

  const handleActivity = (event) => {
    setInputActivity(event.target.value);
  };

  const handleLocation = (event) => {
    setInputLocation(event.target.value);
  };

  const updateActivity = (event) => {
    event.preventDefault();
    setActivity(inputactivity);
    setLocation(inputlocation);
    setInputActivity("");
    setInputLocation("");
  };

  return (
    <div className="box">
      <h1>
        Your Activity: <span> {activity} at {location} </span>
      </h1>

      <form className="form">
        <div class="field">
          <label for="activity">Update Activity</label>
          <div class="control">
            <input
              type="text"
              value={inputactivity}
              name="activity"
              onChange={handleActivity}
              class="input"
            />
            </div>
            <div>
            <label for="location">Update Location</label>
            <input
              type="text"
              value={inputlocation}
              name="location"
              onChange={handleLocation}
              class="input"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button onClick={updateActivity} class="button is-dark">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NameForm;
