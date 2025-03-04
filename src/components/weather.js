import React, { useState, useEffect } from 'react';
import './weather.css';

const Weather = ({ city, weatherData, weatherOnClick, onChangeCity, unit }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);

  // List of predefined cities
  const cities = ["New Delhi", "New York", "Lucknow", "London", "Paris", "Punjab", "Tokyo", "Mumbai", "Sydney", "Toronto", "Dubai"];

  // Fix: Ensure we access the correct path in the OpenWeather API response
  const weatherIcon = weatherData?.list?.[0]?.weather?.[0]?.icon 
    ? `https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`
    : null;

  // Filter cities based on input value
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
          <h3 className="city-name">{weatherData?.city?.name ?? "Not found"}</h3>
          <h3>{"Local Time: " + new Date().toLocaleTimeString()}</h3>
          <div className="temp-weather">
            {weatherIcon && <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />}
            <h3 className="temp">
              {"Temperature: " + (weatherData?.list?.[0]?.main?.temp ?? "-")}{unit === "metric" ? "°C" : "°F"}
            </h3>
            <h3 className="temp">
              {"Feels Like: " + (weatherData?.list?.[0]?.main?.feels_like ?? "-") + "°"}
            </h3>
            <h3 className="temp">
              {"Humidity: " + (weatherData?.list?.[0]?.main?.humidity ?? "-") + "%"}
            </h3>
            <h3 className="temp">
              {"Wind Speed: " + (weatherData?.list?.[0]?.wind?.speed ?? "-") + (unit === "metric" ? " m/s" : " mph")}
            </h3>
          </div>
          <h3 className="weather-condition">
            {weatherData?.list?.[0]?.weather?.[0]?.description ?? "-"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Weather;
