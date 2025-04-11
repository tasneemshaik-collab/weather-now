import React, { useState } from "react";
import "./App.css";

const API_KEY = "d31120fef343431863eb0d63f927e140"; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [theme, setTheme] = useState("dark");

  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Weather Error:", error);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      const daily = data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
      setForecastData(daily);
    } catch (error) {
      console.error("Forecast Error:", error);
    }
  };

  const handleGetWeather = () => {
    if (city.trim()) {
      fetchWeather(city);
      setForecastData([]); // reset forecast view
    }
  };

  const handleUseLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeatherData(data);
        setCity(data.name);
        setForecastData([]);
      } catch (error) {
        console.error("Location Error:", error);
      }
    });
  };

  const handleGetForecast = () => {
    if (city.trim()) {
      fetchForecast(city);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>🌦️ WeatherNow by Tasneem</h1>
        <p>Check the current weather in any city around the world!</p>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleGetWeather}>Get Weather</button>
        </div>
        <div className="button-group">
          <button onClick={handleUseLocation}>📍 Use My Location</button>
          <button onClick={handleGetForecast}>📅 5-Day Forecast</button>
          <button onClick={toggleTheme}>🌓 Switch Theme</button>
        </div>

        {weatherData && !forecastData.length && (
          <div className="weather-card">
            <h2>{weatherData.name}</h2>
            <p>🌡️ {weatherData.main.temp}°C</p>
            <p>🌤️ {weatherData.weather[0].description}</p>
          </div>
        )}

        {forecastData.length > 0 && (
          <div className="forecast-section">
            {forecastData.map((day, index) => (
              <div className="forecast-card" key={index}>
                <h4>{new Date(day.dt_txt).toLocaleDateString()}</h4>
                <p>🌡️ {day.main.temp}°C</p>
                <p>🌤️ {day.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
