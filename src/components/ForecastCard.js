import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ forecastData, unit }) => {
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="forecast-container">
      {forecastData?.map((day, index) => (
        <div key={index} className="forecast-card">
          <h3 className="forecast-day">{getDayOfWeek(day.date)}</h3>
          <img
            src={`https:${day.day.condition.icon}`}
            alt="Weather Icon"
            className="forecast-icon"
          />
          <p className="temp">
            High: {Math.round(unit === "metric" ? day.day.maxtemp_c : day.day.maxtemp_f)}{unit === "metric" ? "°C" : "°F"} / Low: {Math.round(unit === "metric" ? day.day.mintemp_c : day.day.mintemp_f)}{unit === "metric" ? "°C" : "°F"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;
