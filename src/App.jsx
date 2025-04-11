/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherDisplay from "./WeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState("light");

  const apiKey = "d31120fef343431863eb0d63f927e140"; // <-- Replace with your OpenWeatherMap API key

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const fetchWeather = async (cityName) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherRes.json();
      if (weatherData.cod !== 200) {
        alert("City not found");
        return;
      }
      setWeather(weatherData);

      const { coord } = weatherData;
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastRes.json();

      // Reduce forecast data to 5 days (one per day at noon)
      const daily = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily.slice(0, 5));
    } catch (err) {
      alert("Error fetching weather data.");
      console.error(err);
    }
  };

  const handleCityChange = (e) => setCity(e.target.value);

  const handleGetWeather = () => {
    if (city.trim()) fetchWeather(city);
  };

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => alert("Location access denied.")
    );
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.name) fetchWeather(data.name);
    } catch (err) {
      alert("Unable to get weather for your location.");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <p>Get the current weather and forecast anywhere!</p>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleGetWeather}>Get Weather</button>
        <button onClick={handleUseMyLocation}>📍 Use My Location</button>
        <button onClick={toggleTheme}>🌓 Switch Theme</button>
      </div>

      {weather && <WeatherDisplay weather={weather} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

export default App;
