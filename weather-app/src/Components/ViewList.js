// Call List from Form.JS when Add Button Triggered

function ViewList({ list }) {
  return (
    <>
      <div>
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
            {list.map((item, i) => (
              <tr key={i}>
                <td>{item.activity}</td>
                <td>{item.location}</td>
                <td>{item.time}</td>
                <td>{item.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewList;