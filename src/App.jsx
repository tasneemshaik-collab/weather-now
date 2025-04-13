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

  const apiKey = "d31120fef343431863eb0d63f927e140"; // replace this

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        alert("City not found");
        return;
      }
      setWeather(data);

      const { lat, lon } = data.coord;
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastRes.json();
      const daily = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily.slice(0, 5));
    } catch (err) {
      alert("Error fetching data.");
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.name) fetchWeather(data.name);
    } catch (err) {
      alert("Location weather failed.");
    }
  };

  const handleCityChange = (e) => setCity(e.target.value);
  const handleGetWeather = () => city && fetchWeather(city);
  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => alert("Location access denied.")
    );
  };
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    
    <div className="app">
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <div className="controls">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={handleGetWeather}>Get Weather</button>
        <button onClick={handleUseMyLocation}>📍 Use My Location</button>
        <button onClick={toggleTheme}>🌓 Switch Theme</button>
      </div>
      <h4>
        Next 5 Days Forecast
      </h4>
      {weather && <WeatherDisplay weather={weather} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

export default App;
