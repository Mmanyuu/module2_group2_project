// Form to Read, Add, Update and Delete user dummy data (UsersData.js)
// Letting user to add other activity on current day
// https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
// https://github.com/joshnh/Git-Commands

// Import UseState Library
import { useState } from "react";
import Card from "./Card";
import ViewList from "./ViewList";

function AddForm() {
  // Create List when Add Button is click
  const [list, setList] = useState([]);

  // Create Default State for Input Field
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");

  const handleChangeActivity = (value) => {
    setActivity(value);
  };

  const handleChangeLocation = (value) => {
    setLocation(value);
  };

  const handleChangeTime = (value) => {
    setTime(value);
  };

  const handlerChangeComment = (value) => {
    setComment(value);
  };

  // Create Submit when Add button click
  const handlerAddDetail = () => {
    console.log("handlerAddDetail: activity, location: ", activity, location);
    // Create new list item
    const newItem = {
      activity: activity,
      location: location,
      time: time,
      comment: comment,
    };

    // Copy previous list and append new item to its end
    const newList = [...list, newItem];
    console.log("  newList:", newList);
    setList(newList);
  };

  return (
    <div>
      <h1>Enter New Actitity:</h1>
      <Card
        activity={activity}
        location={location}
        time={time}
        comment={comment}
        handleChangeActivity={handleChangeActivity}
        handleChangeLocation={handleChangeLocation}
        handleChangeTime={handleChangeTime}
        handlerChangeComment={handlerChangeComment}
        handlerAddDetail={handlerAddDetail}
      />
      <ViewList list={list} />
    </div>
  );
}

export default AddForm;
