import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ResponsesProvider } from "./Context/ResponsesContext"; // Import the ResponsesProvider
import Introduction from "./Components/Introduction";
import MainPage from "./Components/MainPage";
// import GeoCoordinates from "./Components/GeoCoordinates";
// import WeatherData from "./Components/WeatherData";
// import NextDayForecast from "./Components/NextDayForecast";
// import FourDayForecast from "./Components/FourDayForecast";
// import AirQuality from "./Components/AirQuality";

function App() {
  // This asynchronous function is called when a user submits a location from the Header component.

  // 1) It first updates the location state with the locationInput provided.
  // 2) It then attempts to fetch the geographical coordinates using the GeoCoordinates function, passing the locationInput.
  // 3) If successful, it updates the coords state with the retrieved lon and lat.
  // 4) If an error occurs during the fetch (e.g., invalid location), it logs the error to the console and displays an alert.
  // const handleSearch = async (locationInput) => {
  //   setLocation(locationInput);
  //   try {
  //     // Fetch coordinates using GeoCoordinates
  //     const { lon, lat } = await GeoCoordinates(locationInput);
  //     setCoords({ lon, lat }); // Store the coordinates
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert(
  //       "Could not fetch coordinates. Please check the location and try again."
  //     );
  //   }
  // };

  return (
    <div className="App">
      <ResponsesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/MainPage" element={<MainPage />} />
          </Routes>
        </Router>
      </ResponsesProvider>
      {/* <ViewMainPage /> */}
      {/* <Introduction /> */}
      {/* <EditForm /> */}
            {/* <div>
        <Header onSearch={handleSearch} />
        {coords.lon && coords.lat && (
          <>
            <WeatherData
              lon={coords.lon}
              lat={coords.lat}
              location={location}
            />
            <AirQuality lat={coords.lat} long={coords.lon} />
            <NextDayForecast />
            <FourDayForecast />
          </>
        )}
      </div> */}
    </div>
  );
}

export default App;
