// https://codepen.io/Hafoux/pen/ZEOwzdQ
// https://dev.to/aryclenio/unidirectional-and-bidirectional-data-flow-the-ultimate-front-end-interview-questions-guide-pt-1-5cnc
// React Unidirectional Data Flow
// https://medium.com/@raoradhika/store-and-retrieve-data-in-localstorage-in-react-1fb0ccfe3a35

import { useState } from "react";

function NameForm({user, userlocation}) {
  const [activity, setActivity] = useState(user);
  const [location, setLocation] = useState(userlocation);
  const [data, setData] = useState(true);
  const [editData, setEditData] = useState(false);
  // console.log(userlocation);

  function handleSubmission() {
    localStorage.clear();
    let userData = {
      Activity: activity,
      Location: location,
    };
    localStorage.setItem("userInfo", JSON.stringify(userData));
    document.getElementsByClassName("span").style = "block";
    setEditData(false);
    // alert("Data recorded!");
    // window.location.reload();
  }

  let userInfo = "";
  function toggleGetData() {
    setData(true);
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo.Activity);
    setActivity(userInfo.Activity);
    setLocation(userInfo.Location);
  }

  function toggleEditData() {
    setEditData(true);
    console.log(editData);
  }

  return (
    <div className="background">
      <div className="box">
        <div className="left-box">
          <h3>Your Activity:</h3>
          <div>
            <label htmlFor="activity"> Activity </label>
            <input
              type="text"
              name="activity"
              placeholder="Type your Activity"
              onChange={(e) => setActivity(e.target.value)}
              value={editData ? activity : ""}
            />
          </div>
          <div>
            <label htmlFor="location"> Location </label>
            <input
              type="text"
              name="location"
              placeholder="Type your location"
              onChange={(e) => setLocation(e.target.value)}
              value={editData ? location : ""}
            />
          </div>
          <button onClick={handleSubmission}>Save my Activity</button>
        </div>
        <div className="right-box" style={{ textAlign: "center" }}>
          <button style={{ marginRight: "5px" }} onClick={toggleGetData}>
            Get Activity
          </button>
          <button onClick={toggleEditData}>Edit Activity</button>
          {data && (
            <>
              <div className="data">
                <div> Activity - {activity}</div>
                <div> Location - {location}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NameForm;
