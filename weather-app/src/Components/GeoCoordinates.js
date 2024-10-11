// Updated Geolocation API to Nominatim for more accurate coordibnates exclusive to Singapore.

import axios from "axios";

const GeoCoordinates = async (location) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: location,
          countrycodes: "SG",
          format: "json",
          limit: 1,
        },
      }
    );

    if (response.data.length === 0) {
      throw new Error(
        `Could not find coordinates for "${location}".`
      );
    }

    const { lat, lon } = response.data[0];
    console.log(`Fetched coordinates for ${location}:`, { lat, lon });
    return { lat, lon };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

export default GeoCoordinates;
