import "./App.css";
// import Introduction from "./Components/Introduction";
import Form from "./Components/Form";
import { useState } from "react";
import Header from "./Components/Header";
import GeoCoordinates from "./Components/GeoCoordinates";
import WeatherData from "./Components/WeatherData";
// import NextDayForecast from "./Components/NextDayForecast";
// import FourDayForecast from "./Components/FourDayForecast";
// import AirQuality from "./Components/AirQuality";

function App() {
  const [coords, setCoords] = useState({ lon: null, lat: null });
  const [location, setLocation] = useState("");

  // This asynchronous function is called when a user submits a location from the Header component.

  // 1) It first updates the location state with the locationInput provided.
  // 2) It then attempts to fetch the geographical coordinates using the GeoCoordinates function, passing the locationInput.
  // 3) If successful, it updates the coords state with the retrieved lon and lat.
  // 4) If an error occurs during the fetch (e.g., invalid location), it logs the error to the console and displays an alert.
  const handleSearch = async (locationInput) => {
    setLocation(locationInput);
    try {
      // Fetch coordinates using GeoCoordinates
      const { lon, lat } = await GeoCoordinates(locationInput);
      setCoords({ lon, lat }); // Store the coordinates
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Could not fetch coordinates. Please check the location and try again."
      );
    }
  };

  return (
    <div className="App">
      {/* <Introduction /> */}
      <Form />
      <div>
        <Header onSearch={handleSearch} />
        {coords.lon && coords.lat && (
          <>
            <WeatherData
              lon={coords.lon}
              lat={coords.lat}
              location={location}
            />
            {/* <AirQuality lat={coords.lat} long={coords.lon} />
            <NextDayForecast />
            <FourDayForecast /> */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
