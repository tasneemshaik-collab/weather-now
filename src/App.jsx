import React, { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";
import "./App.css";
import { getCoordinates, getForecastData } from "./api";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [darkTheme, setDarkTheme] = useState(true);

  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

  const fetchWeather = async (cityName) => {
    try {
      const { lat, lon } = await getCoordinates(cityName, apiKey);
      const weatherData = await fetchWeatherByCoords(lat, lon, apiKey);
      setWeather({ ...weatherData, name: cityName });
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
      setForecast(forecastData.slice(0, 7)); // Only show 7 days
    } catch (err) {
      alert("Error fetching 7-day forecast.");
      console.error(err);
    }
  };

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude, apiKey)
        .then((data) => {
          setWeather({ ...data, name: "Your Location" });
        })
        .catch((err) => {
          alert("Unable to fetch location weather.");
          console.error(err);
        });
    });
  };

  const handleThemeToggle = () => setDarkTheme(!darkTheme);

  return (
    <div className={`app ${darkTheme ? "dark" : "light"}`}>
      <div className="controls">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={handleGetWeather}>Get Weather</button>
        <button onClick={handleUseMyLocation}>📍 Use My Location</button>
        <button onClick={handleShowForecast}>📅 5-Day Forecast</button>
        <button onClick={handleThemeToggle}>🎨 Switch Theme</button>
      </div>

      {weather && <WeatherDisplay weather={weather} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

export default App;
