// Call List from Form.JS when Add Button Triggered
import { useState } from "react";

function ViewList({ list, handlerDeleteItem, handlerEditItem }) {
  const [form, setForm] = useState();

  return (
    <>
      <form>
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th></th>
              <th>Location</th>
              {/* <th>Time</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                //   value={form.activity}
                  type="text"
                //   onChange={(event) => handlerUpdateForm(event, "activity")}
                />
              </td>
              <td> AT </td>
              <td>
                <input
                //   value={form.location}
                  type="text"
                //   onChange={(event) => handlerUpdateForm(event, "location")}
                />
              </td>
              {/* <td>
                <input
                  value={form.time}
                  type="time"
                  onChange={(event) => handlerUpdateForm(event, "time")}
                />
              </td> */}
            </tr>
          </tbody>
        </table>
        <button label="Update Detail" >Edit</button>
        {/* <button label='Update' onClick={handlerSubmitForm} /> */}
        {/* <button label='Cancel' onClick={() => setIsEditing(false)} /> */}
      </form>
    </>
  );
}

export default ViewList;
