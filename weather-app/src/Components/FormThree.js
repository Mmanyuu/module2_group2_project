//https://fontawesomeicons.com/fa/react-js-table-with-edit-and-delete-button

import { useState } from "react";
import { v4 as uuid } from "uuid";

function FormAddEdit() {
  const [rows, setRows] = useState([
    { activity: "Alice", location: "alice@example.com", editing: false },
    { activity: "Michael", location: "michael@example.com", editing: false },
    { activity: "Emily", location: "emily@example.com", editing: false },
    { activity: "David", location: "david@example.com", editing: false },
    { activity: "Sarah", location: "sarah@example.com", editing: false },
    { activity: "Daniel", location: "daniel@example.com", editing: false },
    { activity: "Olivia", location: "olivia@example.com", editing: false },
    { activity: "Andrew", location: "andrew@example.com", editing: false },
  ]);

  const editRow = (row) => {
    const updatedRows = rows.map((r) => {
      if (r === row) {
        return { ...r, editing: true };
      }
      return r;
    });
    setRows(updatedRows);
  };

  const saveRow = (row) => {
    const updatedRows = rows.map((r) => {
      if (r === row) {
        return { ...r, editing: false };
      }
      return r;
    });
    setRows(updatedRows);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const addRow = () => {
    const newRows = [
      ...rows,
      { id: uuid(), activity: "", location: "", editing: true },
    ];
    setRows(newRows);
    console.log(newRows);
  };

  return (
    <div className="container">
      <h3>Your Activity Forecast:</h3>
      <button className="add-button" onClick={addRow}>
        Add Row
      </button>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {!row.editing && <td>{row.activity}</td>}
              {!row.editing && <td>{row.location}</td>}
              {row.editing && (
                <td>
                  <input
                    type="text"
                    value={row.activity}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[index].activity = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                </td>
              )}
              {row.editing && (
                <td>
                  <input
                    type="text"
                    value={row.location}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[index].location = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                </td>
              )}
              <td>
                {!row.editing && (
                  <button className="edit-button" onClick={() => editRow(row)}>
                    Edit
                  </button>
                )}
                {row.editing && (
                  <button className="save-button" onClick={() => saveRow(row)}>
                    Save
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => deleteRow(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormAddEdit;
