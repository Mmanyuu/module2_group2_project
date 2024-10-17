//https://fontawesomeicons.com/fa/react-js-table-with-edit-and-delete-button

import { useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./FormThree.module.css";

function FormAddEdit() {

  const blankForm = {
    // index: 0,
    activity: "",
    location: "",
  };

  // Setting one default row with detail
  // { activity: "Badminton", location: "Bishan", editing: false },
  const [rows, setRows] = useState([blankForm]);

  // Edit handler
  const editRow = (row) => {
    const updatedRows = rows.map((r) => {
      if (r === row) {
        return { ...r, editing: true };
      }
      return r;
    });
    setRows(updatedRows);
  };

  // Save handler
  const saveRow = (row) => {
    const updatedRows = rows.map((r) => {
      if (r === row) {
        return { ...r, editing: false };
      }
      return r;
    });
    setRows(updatedRows);
  };

  // Delete handler
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  // Add handler
  const addRow = () => {
    const newRows = [
      ...rows,
      { id: uuid(), activity: "", location: "", editing: true },
    ];
    setRows(newRows);
    console.log(newRows);
  };

  return (
    <div className={styles.tableContainer}>
      <table>
        {/* <thead>
          <tr>
            <th>Activity</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead> */}
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
      <button className={styles.addButton} onClick={addRow}>
        Add
      </button>
    </div>
  );
}

export default FormAddEdit;
