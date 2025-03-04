import React, { useState, useEffect } from "react";
import axios from 'axios';
import Weather from "../components/weather";
import ForecastCard from "../components/ForecastCard";
import "./dashboard.css";

const apiKey = '5a9438e54d8643be91e193147242109';

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
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`
            );
            setWeatherData(response.data);
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
                <ForecastCard forecastData={weatherData?.forecast?.forecastday} unit={unit} />
            </div>
        </div>
    );
}

export default App;
