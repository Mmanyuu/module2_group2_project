// Call List from Form.JS when Add Button Triggered

function ViewList({ list, handlerDeleteItem, handlerEditItem }) {
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Actitity</th>
              <th>Location</th>
              <th>Time</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.activity}</td>
                <td>{item.location}</td>
                <td>{item.time}</td>
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

export default ViewList;