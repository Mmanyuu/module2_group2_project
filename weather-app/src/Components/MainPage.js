
// import React, { useState } from "react";
// import Header from "./Header";
// import WeatherData from "./WeatherData";
// import GeoCoordinates from "./GeoCoordinates";
// import PersonalisedInfo from "./PersonalisedInfo";
// import styles from "./MainPage.module.css";
// import { useNavigate } from "react-router-dom";

// const MainPage = () => {
//   const [coords, setCoords] = useState({ lon: null, lat: null });
//   const [location, setLocation] = useState("");
//   const navigate = useNavigate();


//   // This asynchronous function is called when a user submits a location from the Header component.

//   // 1) It first updates the location state with the locationInput provided.

//   // 2) It then attempts to fetch the geographical coordinates using the GeoCoordinates function, passing the locationInput.

//   // 3) If successful, it updates the coords state with the retrieved lon and lat.

//   // 4) If an error occurs during the fetch (e.g., invalid location), it logs the error to the console and displays an alert.

//   const handleSearch = async (locationInput) => {
//     setLocation(locationInput);
//     try {
//       // Fetch coordinates using GeoCoordinates
//       const { lon, lat } = await GeoCoordinates(locationInput);
//       // Navigate to SearchResultPage with the coordinates and location
//       setCoords({ lon, lat }); // Store the coordinates
//       navigate("/searchResult", {
//         state: { coords: { lon, lat }, location: locationInput },
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       alert(
//         "Could not fetch coordinates. Please check the location and try again."
//       );
//     }
//   };

//   return (
//     <div>
//       <Header onSearch={handleSearch} />
//       {coords.lon && coords.lat && (
//         <WeatherData
//           lon={coords.lon}
//           lat={coords.lat}
//           location={location}
//         />
//       )}
//       <div className={styles.dashboardContainer}>
//         <PersonalisedInfo />
//       </div>
//     </div>
//   );
// };

// export default MainPage;

import React from "react";
import Header from "./Header";
import PersonalisedInfo from "./PersonalisedInfo";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div>
      <Header />

      <div className={styles.dashboardContainer}>
        <PersonalisedInfo />
      </div>
    </>
  );
};

export default MainPage;
