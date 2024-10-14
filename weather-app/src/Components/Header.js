import { useState } from "react";
import Clock from "./Clock";
import styles from "./Header.module.css"; // Import CSS module

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
    <header className={styles.headerContainer}>
      <div className={styles.rightSideContainer}>
        <div className={styles.headerTitle}>
          <h2>Weather App</h2>
        </div>
        <form
          className={styles.searchBox}
          onSubmit={handlerSearchSubmit}
        >
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
        <div className={styles.clockContainer}>
          <Clock />
        </div>
      </div>
    </header>
  );
}

export default Header;
