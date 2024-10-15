// Call List from Form.JS when Add Button Triggered

function ViewListDummy({ dummylist, handlerDeleteItem, handlerEditItem }) {
    return (
      <>
        <div>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Time</th>
                {/* <th>Weather</th>
                <th>Work</th>
                <th>Weather</th>
                <th>Add Location</th> */}
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {dummylist.map((item) => (
                <tr key={item.id}>
                  <td>{item.homeLocation}</td>
                  <td>{item.time}</td>
                  {/* <td>{item.workLocation}</td>
                  <td>{item.homeLocation}</td> */}
                  <td onClick={() => handlerDeleteItem(item.id)}>❌</td>
                  <td onClick={() => handlerEditItem(item.id)}>📃</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  
  export default ViewListDummy;