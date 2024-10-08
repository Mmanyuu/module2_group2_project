import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// The GeoCoordinates component is an asynchronous function used to fetch geographical coordinates (longitude and latitude) for a given location using the OpenWeatherMap API.

const GeoCoordinates = async (location) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: location, // location is used for query
          limit: 1, // only one result will be returned
          appid: API_KEY, // API key for authentication
        },
      }
    );

    // Check if no coordinates are found
    if (response.data.length === 0) {
      throw new Error(
        "Could not find coordinates for the provided location."
      );
    }

    // Extract coordinates if found
    const { lon, lat } = response.data[0];
    console.log(`Fetched coordinates for ${location}:`, {
      lon,
      lat,
    }); // Log the coordinates
    return { lon, lat };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error; // Rethrow error to handle it in App.js
  }
};

export default GeoCoordinates;
