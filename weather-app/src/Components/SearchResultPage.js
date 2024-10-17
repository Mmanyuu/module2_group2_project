import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WeatherData from "./WeatherData";

function SearchResultPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { coords, location: loc } = location.state || {};

    const handleBack = () => {
        navigate("/MainPage");
    };

    return (
        <>
            {coords && coords.lon && coords.lat ? (
                <WeatherData lon={coords.lon} lat={coords.lat} location={loc} />
            ) : (
                <p>No weather data available for the selected location.</p>
            )}
<button 
                onClick={handleBack} 
                style={{ 
                    padding: "10px 15px", 
                    backgroundColor: "#373d44", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "4px", 
                    cursor: "pointer",
                    marginLeft:"48%"
                }} 
                aria-label="Go back to the main page"
            >
                Back
            </button>
        </>
    );
}

export default SearchResultPage;
