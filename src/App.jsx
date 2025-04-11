import React, { useState } from "react";
import "./App.css";
import WeatherDisplay from "./WeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState("light");

  const fetchWeather = async (cityName) => {
    try {
      const apiKey = "YOUR_API_KEY";
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      const { coord } = weatherData;
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();

      const daily = forecastData.list.filter((_, idx) => idx % 8 === 0);
      setForecast(daily);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=YOUR_API_KEY`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setCity(data.name);
          return fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=YOUR_API_KEY`
          );
        })
        .then((res) => res.json())
        .then((forecastData) => {
          const daily = forecastData.list.filter((_, idx) => idx % 8 === 0);
          setForecast(daily);
        });
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`app ${theme}`}>
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <p>Get the current weather and forecast anywhere!</p>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Get Weather</button>
        <button onClick={getLocationWeather}>📍 Use My Location</button>
        <button onClick={toggleTheme}>🌓 Switch Theme</button>
      </div>
      {weather && <WeatherDisplay weather={weather} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

export default App;
