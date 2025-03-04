import React, { useState, useEffect } from "react";
import axios from 'axios';
import Weather from "../components/weather";
import ForecastCard from "../components/ForecastCard";
import "./dashboard.css";

const apiKey = 'bbff50e80358b0af490a9a3e8f82808a';
// const apiKey = 'e25fd88865795c3c74a1918c517cc867';
// const apiKey = 'bbff50e80358b0af490a9a3e8f82808a';


const App = () => {
    const [city, setCity] = useState("New Delhi");
    const [weatherData, setWeatherData] = useState({});
    const [unit, setUnit] = useState('metric');

    useEffect(() => {
        getWeather();
    }, [city, unit]);

    const getWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
            );
            setWeatherData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching the weather data', error);
        }
    };

    const handleUnitToggle = () => {
        setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
    };

    return (
        <div className="dashboard-container">
            <div className="card-container">
                <h1 className="card-title">WeatherForecast.com</h1>
                <button className="unit-toggle-button" onClick={handleUnitToggle}>
                    Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
                </button>
                <Weather city={city} weatherData={weatherData} weatherOnClick={getWeather} onChangeCity={setCity} unit={unit} />
                <ForecastCard forecastData={weatherData} unit={unit} />
            </div>
        </div>
    );
}

export default App;
