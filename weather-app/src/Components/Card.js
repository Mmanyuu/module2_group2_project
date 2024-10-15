// Children Card
// With Reference from Module 2.5
// import { ComponentApple, ComponentOrange, ComponentPear } from './FruitsComponent';
// export function ComponentOrange
// Sliding card from left side when clicked on button in react
// https://codesandbox.io/p/sandbox/cocky-snow-jezquu?file=%2Fsrc%2FApp.js

// import { useState } from "react";

// Create Input Function
function Input({ value, label, onChange, type }) {

  const handlerChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input onChange={handlerChange} value={value} type={type} />
    </div>
  );
}

// Create ADD Button Function
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// const today = moment();
// const dow = today.day();

// const array = moment.weekdays()
// const newArr2 = array.map(v => ({[v]: { isActive: true}}))
// console.log(newArr2[dow])

export function Calendar() {
  // Map Week to Table
  // https://stackblitz.com/edit/react-g37xut?file=src%2FApp.js
  // https://www.digitalocean.com/community/tutorials/4-uses-of-javascripts-arraymap-you-should-know
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuarday', 'Sunday'];
  // const chooseDay = (days, dayName) => {
  //   const result = [...days]
  //   console.log(result);
  //   result.forEach(day => day.sortedDays[0].chosen = false);
  //   const dayToChange = result.find(({ name }) => name === dayName)
  //   dayToChange.sortedDays[0].chosen = true;
  //   return result;
  // }
  // const [weekDays,setWeekDays] = useState([ 
  //   {name: 'Sunday',sortedDays:[{dayNum:7,chosen:false}]},
  //   {name: 'Monday',sortedDays:[{dayNum:1,chosen:false}]},
  //   {name: 'Tuesday',sortedDays:[{dayNum:2,chosen:false}]},
  //   {name: 'Wednesday',sortedDays:[{dayNum:3,chosen:false}]},
  //   {name: 'Thursday',sortedDays:[{dayNum:4,chosen:false}]},
  //   {name: 'Friday',sortedDays:[{dayNum:5,chosen:false}]},
  //   {name: 'Satuarday',sortedDays:[{dayNum:6,chosen:false}]},
  // ]);
  // https://muhimasri.com/blogs/react-editable-table/
  // https://www.geeksforgeeks.org/how-to-create-an-editable-table-with-add-delete-and-search-filter-using-reactjs/

  return (
    <>
    <div>
      <ul>{weekdays.map(weekday => <li key={weekday}> {weekday} </li>)} </ul>
      {/* {weekdays.map((weekday) => <div>{weekdays}</div>)} */}
    </div>
    </>
  )

  // return <div>
  //   {weekDays.map(
  //     ({ name, sortedDays: [{dayNum, chosen}] }) => 
  //       <button
  //         key={name}
  //         style={{ backgroundColor: chosen && 'green' }} 
  //         onClick={() => setWeekDays(chooseDay(weekDays, name))}>
  //         { name }
  //       </button>  
  //   )}
  //   </div>
}

// Create a Constant Layout
function Card({
  activity,
  location,
  // time,
  handleChangeActivity,
  handleChangeLocation,
  // handleChangeTime,
  handlerAddDetail,
}) {
  return (
    <>
      <div>
        <Input
          placeholder="Enter Actitity"
          type="text"
          value={activity}
          onChange={handleChangeActivity}
        />
        <Input
          placeholder="Enter Location"
          type="text"
          value={location}
          onChange={handleChangeLocation}
        />
        {/* <Input
          placeholder="Enter Time"
          type="time"
          value={time}
          onChange={handleChangeTime}
        /> */}
        <Button label="Add Detail" onClick={handlerAddDetail} />
        {/* <Calendar /> */}
      </div>
    </>
  );
}

export default Card;
