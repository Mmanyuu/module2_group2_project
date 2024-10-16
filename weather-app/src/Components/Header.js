import { useState } from "react";
import styles from "./Header.module.css"; // Import CSS module
import logo from "./images/nimbusLogo.png"

// Header consits of app title, an input form and a real time clock.

function Header({ onSearch }) {
  const [location, setLocation] = useState("");

  // This function is triggered whenever the input field changes. It updates the location state with the current value from the input field (event.target.value).
  const handlerInputChange = (event) => {
    setLocation(event.target.value);
  };

  // It checks if the location input is empty or only contains whitespace. If it is invalid, it alerts the user to enter a valid location and exits the function.
  const handlerSearchSubmit = (event) => {
    event.preventDefault();
    if (!location.trim()) {
      alert("Please enter a valid location");
      return;
    }
    if (onSearch) {
      onSearch(location);
    }
    setLocation("");
  };

  return (
    <div className={styles.headerContainer}>
      <p className={styles.nimbusLogo}><img src={logo} alt = "NimbusNow Logo" width={50} height={50}/></p>
      <form className={styles.searchBox} onSubmit={handlerSearchSubmit}>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={handlerInputChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
}

export default Header;
