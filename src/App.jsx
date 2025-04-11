import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  const fetchWeatherData = async (cityName) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      setCity(weatherData.name); // ensures consistent display

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastRes.json();
      const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);
      setForecast(daily);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getWeather = () => {
    if (city.trim() !== '') {
      fetchWeatherData(city);
    }
  };

  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();
        fetchWeatherData(data.name);
      } catch (err) {
        console.error("Error getting location weather:", err);
      }
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <p>Check the current weather in any city around the world!</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>🌥️ {weather.weather[0].description}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast">
          {forecast.map((day, idx) => (
            <div key={idx} className="forecast-day">
              <strong>{new Date(day.dt_txt).toLocaleDateString()}</strong>
              <p>🌡️ {day.main.temp}°C</p>
              <p>🌤️ {day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="buttons">
        <button onClick={getLocationWeather}>📍 Use My Location</button>
        <button onClick={getWeather}>📅 5-Day Forecast</button>
        <button onClick={() => setDarkMode(prev => !prev)}>🌗 Switch Theme</button>
      </div>
    </div>
  );
}

export default App;
