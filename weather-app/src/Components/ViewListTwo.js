// Call List from Form.JS when Add Button Triggered
// import { useState } from "react";
import React, { useState } from 'react';
import ActivityForm from './FormFour';
import { dummyData } from './UsersData';

function TableData() {
    const [studentData, setStudentData] = useState(dummyData);

    const tableRows = studentData.map((info) => {
        return (
            <tr>
                <td>{info.id}</td>
                <td>{info.name}</td>
                <td>{info.city}</td>
            </tr>
        );
    });

    const addRows = (data) => {
        const totalStudents = studentData.length;
        data.id = totalStudents + 1;
        const updatedStudentData = [...studentData];
        updatedStudentData.push(data);
        setStudentData(updatedStudentData);
    };

    return (
        <div>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>Sr.NO</th>
                        <th>Name</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            <ActivityForm func={addRows} />
        </div>
    );
}

export default TableData;








// function ViewList({ list, handlerDeleteItem, handlerEditItem }) {
//   // const [form, setForm] = useState();

//   return (
//     <>
//       <form>
//         <table>
//           <thead>
//             <tr>
//               <th>Activity</th>
//               <th></th>
//               <th>Location</th>
//               {/* <th>Time</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <input
//                 //   value={form.activity}
//                   type="text"
//                 //   onChange={(event) => handlerUpdateForm(event, "activity")}
//                 />
//               </td>
//               <td> AT </td>
//               <td>
//                 <input
//                 //   value={form.location}
//                   type="text"
//                 //   onChange={(event) => handlerUpdateForm(event, "location")}
//                 />
//               </td>
//               {/* <td>
//                 <input
//                   value={form.time}
//                   type="time"
//                   onChange={(event) => handlerUpdateForm(event, "time")}
//                 />
//               </td> */}
//             </tr>
//           </tbody>
//         </table>
//         <button label="Update Detail" >Edit</button>
//         {/* <button label='Update' onClick={handlerSubmitForm} /> */}
//         {/* <button label='Cancel' onClick={() => setIsEditing(false)} /> */}
//       </form>
//     </>
//   );
// }

// export default ViewList;
