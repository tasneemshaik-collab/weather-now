/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";
import { getCoordinates, getForecastData } from "./api";
import "./App.css";

const apiKey = "YOUR_API_KEY"; // replace with your real API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState("dark");

  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      alert("Error fetching weather data.");
      console.error(err);
    }
  };

  const handleCityChange = (e) => setCity(e.target.value);

  const handleGetWeather = () => {
    if (city.trim()) fetchWeather(city);
  };

  const handleShowForecast = async () => {
    try {
      const { lat, lon } = await getCoordinates(city, apiKey);
      const forecastData = await getForecastData(lat, lon, apiKey);
      setForecast(forecastData);
    } catch (err) {
      alert("Error fetching 7-day forecast.");
      console.error(err);
    }
  };

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    });
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setCity(data.name);
      setWeather(data);
    } catch (err) {
      alert("Error using location.");
    }
  };

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));

  return (
    <div className={`app ${theme}`}>
      <div className="controls">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={handleGetWeather}>Get Weather</button>
        <button onClick={handleUseMyLocation}>📍 Use My Location</button>
        <button onClick={handleShowForecast}>📅 7-Day Forecast</button>
        <button onClick={toggleTheme}>🌓 Switch Theme</button>
      </div>

      {weather && <WeatherDisplay weather={weather} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

export default App;
