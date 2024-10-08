// Form to Read, Add, Update and Delete user dummy data (UsersData.js)
// Letting user to add other activity on current day
// https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
// https://github.com/joshnh/Git-Commands

// Import Library
import { v4 as uuid } from "uuid";
import { useState } from "react";
import Card from "./Card";
import ViewList from "./ViewList";

function AddForm() {

  // Create a Empty Form
  const blankForm = {
    index: 0,
    activity: "",
    location: "",
    time: "",
    comment: "",
  };

  // Create List when Add Button is click
  const [list, setList] = useState([]);
  // Check the Form Status
  const [form, setForm] = useState(blankForm);

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
      id: uuid(),
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

  // Delete Handler
  const handlerDeleteItem = (id) => {
    // console.log(e.currentTarget.dataset.id);
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.id !== id);
      return updatedList;
    });
  };

  // First When Edit button is clicked from the List > this will open the Edit Form
  const handlerEditForm = (id) => {
    const findItem = list.findIndex((item) => item.id === id);
    const editValues = {
      index: findItem,
      activity: list[findItem].activity,
      location: list[findItem].location,
      time: list[findItem].time,
      comment: list[findItem].comment,
    };
    console.log(editValues);
    setForm(editValues);
  };

  // Second This will capture the content in the input field
  // Before the Submit Button Clicked
  const handlerUpdateForm = (event, key) => {
    const value = event.target.value;
    const updatedForm = {...form, [key]: value};
    setForm(updatedForm);
    // console.log(value);
  }

  // Last HandlerUpdateForm
  const handlerSubmitForm = (event) => {
    event.preventDefault();

    // Create new item and copy values from form
    const newItem = {...list[form.index]};
    console.log(newItem);
    newItem.activity = form.activity;
    newItem.location = form.location;
    newItem.time = form.time;
    newItem.location = form.comment;

    // Copy current list and replace edited item
    const newList = [...list];
    newList[form.index] = newItem;
    setList(newList);
  }

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
      <ViewList
        list={list}
        handlerDeleteItem={handlerDeleteItem}
        handlerEditItem={handlerEditForm}
      />

      {/* This will call the Form with the item of the ID with Update and Cancel Button */}
      <form onSubmit={handlerSubmitForm}>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Location</th>
                <th>Time</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input value={form.activity} type='text'
                  onChange={(event) => handlerUpdateForm(event, 'activity')} />
              </td>
              <td>
                <input value={form.location} type='text'
                  onChange={(event) => handlerUpdateForm(event, 'location')} />
              </td>
              <td>
                <input value={form.time} type='text'
                  onChange={(event) => handlerUpdateForm(event, 'time')} />
              </td>
              <td>
                <input value={form.comment} type='text'
                  onChange={(event) => handlerUpdateForm(event, 'comment')} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type='submit' />
        {/* <button label='Cancel' onClick={() => setIsEditing(false)} /> */}
      </form>
    </div>
  );
}

export default AddForm;
