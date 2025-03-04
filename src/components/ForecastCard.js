import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ forecastData, unit }) => {
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const filteredForecast = [];
  const seenDates = new Set();

  forecastData?.list?.forEach((day) => {
    const date = day.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)

    if (!seenDates.has(date)) {
      seenDates.add(date);
      filteredForecast.push(day);
    }
  });

  // Skip the first entry and keep the next 5 days
  const finalForecast = filteredForecast.slice(1, 6);

  return (
    <div className="forecast-container">
      {finalForecast.map((day, index) => (
        <div key={index} className="forecast-card">
          <h3 className="forecast-day">{getDayOfWeek(day.dt_txt)}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="forecast-icon"
          />
          <p className="temp">
            High: {Math.round(unit === "metric" ? day.main.temp_max : (day.main.temp_max * 9/5) + 32)}{unit === "metric" ? "°C" : "°F"} / 
            Low: {Math.round(unit === "metric" ? day.main.temp_min : (day.main.temp_min * 9/5) + 32)}{unit === "metric" ? "°C" : "°F"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;
