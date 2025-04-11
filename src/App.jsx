import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  const getWeatherByLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
            );
            const data = await response.json();
            setWeather(data);
            setCity(data.name);
          } catch (error) {
            console.error("Location error:", error);
          }
          setLoading(false);
        },
        (error) => {
          alert("Unable to retrieve your location.");
          console.error("Geolocation error:", error);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  return (
    <div className="app">
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <p>Check the current weather in any city around the world!</p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <p className="loading">Loading weather data...</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>☁️ {weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      <h3 className="explore">Explore More</h3>
      <div className="actions">
        <button onClick={getWeatherByLocation}>📍 Use My Location</button>
        <button onClick={() => alert("Feature coming soon!")}>📅 5-Day Forecast</button>
        <button onClick={() => alert("Dark theme coming soon!")}>🎨 Switch Theme</button>
      </div>
    </div>
  );
}

export default App;
