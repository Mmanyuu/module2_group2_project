import styles from "./PersonalisedInfo.module.css";

function FormTwo () {
  return (
    <div className={styles.personaliseBox}>
      <div className={styles.personaliseContainer}>
        <form>
          <table>
            <thead>
              <tr>
                <th>Home</th>
                <th>Weather</th>
                <th>Work</th>
                <th>Weather</th>
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
                <td>
                  <input
                    //   value={form.location}
                    type="text"
                    //   onChange={(event) => handlerUpdateForm(event, "location")}
                  />
                </td>
                <td>
                  <input
                    //   value={form.time}
                    type="text"
                    //   onChange={(event) => handlerUpdateForm(event, "time")}
                  />
                </td>
                <td>
                  <input
                    //   value={form.comment}
                    type="text"
                    //   onChange={(event) => handlerUpdateForm(event, "comment")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" />
          {/* onClick={handlerSubmitForm} /> */}
          {/* <button label='Cancel' onClick={() => setIsEditing(false)} /> */}
        </form>
      </div>
    </div>
  );
};

export default FormTwo;
