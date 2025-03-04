import React, { useState, useEffect } from 'react';
import './weather.css';

const Weather = ({ city, weatherData, weatherOnClick, onChangeCity, unit }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);

  // List of predefined cities
  const cities = ["New Delhi","New York","Lucknow", "London", "Paris","Punjab", "Tokyo", "Mumbai", "Sydney", "Toronto", "Dubai"];

  const weatherIcon = weatherData?.current ? `https://${weatherData?.current?.condition?.icon}` : null;

  // Filter cities based on the input value
  useEffect(() => {
    if (city.length > 0) {
      setFilteredCities(cities.filter(c => c.toLowerCase().includes(city.toLowerCase())));
    } else {
      setFilteredCities([]);
    }
  }, [city]);

  const handleCitySelect = (selectedCity) => {
    onChangeCity(selectedCity);
    setIsDropdownVisible(false);
  };

  return (
    <div className="weather-container">
      <div className="search-section">
        <div>
          <input
            type="text"
            value={city}
            onChange={(e) => onChangeCity(e.target.value)}
            className="enter-city-bar"
            placeholder="Enter city..."
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          />

          {isDropdownVisible && (
            <div className="dropdown-wrapper">             
              <ul className="city-dropdown">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <li key={index} onClick={() => handleCitySelect(city)}>
                      {city}
                    </li>
                  ))
                ) : (
                  <li>No cities found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="weather-card">
        <div className="weather-info">
          <h3 className="city-name">{weatherData?.location?.name ?? "Not found"}</h3>
          <div className="temp-weather">
            {weatherIcon && <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />}
            <h3 className="temp">
              {unit === "metric" ? weatherData?.current?.temp_c ?? "-" : weatherData?.current?.temp_f ?? "-"}{unit === "metric" ? "°C" : "°F"}
            </h3>
          </div>
          <h3 className="weather-condition">
            {weatherData?.current?.condition?.text ?? "-"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Weather;
