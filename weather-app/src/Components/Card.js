// Children Card
// With Reference from Module 2.5

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

// Create a Constant Layout
function Card({
  activity,
  location,
  time,
  handleChangeActivity,
  handleChangeLocation,
  handleChangeTime,
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
        <Input
          placeholder="Enter Time"
          type="time"
          value={time}
          onChange={handleChangeTime}
        />
        <Button label="Add Detail" onClick={handlerAddDetail} />
      </div>
    </>
  );
}

export default Card;