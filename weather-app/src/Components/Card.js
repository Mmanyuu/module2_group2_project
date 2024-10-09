
// Children Card
// With Reference from Module 2.5

// Create Input Function
function Input({ value, label, onChange }) {
    const handlerChange = (event) => {
      onChange(event.target.value);
    };
    
    return (
      <div>
        <label>{label}</label>
        <input onChange={handlerChange} value={value} 
        />
      </div>
    );
  }

// Create ADD Button Function
  function Button({ label, onClick }) {
    return (
      <button onClick={onClick}>
        {label}
      </button>
    );
  }

// Create a Constant Layout
function Card({
    activity,
    location,
    time,
    comment,
    handleChangeActivity,
    handleChangeLocation,
    handleChangeTime,
    handlerChangeComment,
    handlerAddDetail,
  }) {

    return (
      <div>
        <Input placeholder="Enter Actitity" value={activity} onChange={handleChangeActivity} />
        <Input placeholder="Enter Places" value={location} onChange={handleChangeLocation} />
        <Input placeholder="Enter Time" value={time} onChange={handleChangeTime} />
        <Input placeholder="Comments" value={comment} onChange={handlerChangeComment} />
        <Button label="Add Detail" onClick={ handlerAddDetail } />
      </div>
    );
  }

  export default Card;