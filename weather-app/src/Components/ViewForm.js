import styles from "./Form.module.css";

function ViewForm () {
    return (
        <div className={styles.container}>
        <form className={styles.Form}>
        <p>Update Your Information</p>
          <input type="text" placeholder="Name" /> <br />
          <input type="text" placeholder="Home Address" /> <br />
          <input type="text" placeholder="Office Address" /> <br />
          <div>
            <button className={styles.button}>Update</button>
            <button className={styles.button}>Back</button>
          </div>
        </form>
      </div>
    )
}

export default ViewForm;