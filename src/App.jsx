import React, { useState } from "react";
import "./App.css";

const API_KEY = "d31120fef343431863eb0d63f927e140"; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState("dark");

  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        alert(data.message || "City not found.");
        setWeather(null);
      }
    } catch (error) {
      alert("Failed to fetch weather.");
      console.error(error);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        const daily = data.list.filter((entry) => entry.dt_txt.includes("12:00:00"));
        setForecast(daily.slice(0, 5));
      } else {
        alert(data.message || "Forecast not found.");
        setForecast([]);
      }
    } catch (error) {
      alert("Failed to fetch forecast.");
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (!city.trim()) {
      alert("Please enter a city.");
      return;
    }
    fetchWeather(city);
    fetchForecast(city);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${API_KEY}`
          );
          const data = await res.json();
          if (res.ok) {
            setCity(data.name);
            setWeather(data);
            fetchForecast(data.name);
          } else {
            alert("Unable to get location-based weather.");
          }
        } catch (error) {
          alert("Failed to fetch location weather.");
          console.error(error);
        }
      },
      () => alert("Permission denied or location unavailable.")
    );
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>🌦️ WeatherNow by Tasneem</h1>
        <p>Get the current weather and forecast anywhere!</p>

        <div className="input-group">
          <input
            type="text"
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Get Weather</button>
        </div>

        <div className="button-group">
          <button onClick={handleUseLocation}>📍 Use My Location</button>
          <button onClick={toggleTheme}>🌓 Switch Theme</button>
        </div>

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <p>🌡️ {weather.main.temp}°C</p>
            <p>🌤️ {weather.weather[0].description}</p>
          </div>
        )}

        {forecast.length > 0 && (
          <div className="forecast-section">
            {forecast.map((day, index) => (
              <div className="forecast-card" key={index}>
                <strong>{new Date(day.dt_txt).toLocaleDateString()}</strong>
                <p>🌡️ {day.main.temp}°C</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
