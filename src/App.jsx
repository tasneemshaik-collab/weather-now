import React, { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";
import { getForecastData, getCoordinates } from "./getForecastData";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data.");
      console.error(error);
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
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
      setCity(data.name);
    } catch (error) {
      alert("Failed to fetch weather by coordinates.");
      console.error(error);
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleGetWeather}>Get Weather</button>
        <button onClick={handleUseMyLocation}>📍 Use My Location</button>
        <button onClick={handleShowForecast}>📅 7-Day Forecast</button>
        <button onClick={() => setDarkMode(!darkMode)}>🌓 Switch Theme</button>
      </div>

      {weather && <WeatherDisplay weather={weather} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

export default App;
