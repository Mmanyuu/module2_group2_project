// import styles from "./PersonalisedInfo.module.css";

// function Button({ label, onClick }) {
//   return (
//     <button className={styles.button} onClick={onClick}>
//       {label}
//     </button>
//   );
// }

function FormTwo () {
  return (
    <form>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Disc %</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <input type='number'/>
              </td>
              <td>
                <input type='number'/>  
              </td>
              <td>
                <input type='number'/>
              </td>
              <td>
                <input type='number' />
              </td>
            </tr>
          </tbody>
        </table>
        <input type='submit' />
        {/* <Button label='Cancel' onClick={() => setIsEditing(false)} /> */}
      </form>
  );
};

export default FormTwo;
