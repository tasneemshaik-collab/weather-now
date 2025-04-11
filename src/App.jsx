import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const API_KEY = 'YOUR_API_KEY'; // replace with your actual OpenWeatherMap API key

  const getWeather = async () => {
    if (!city) return;

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const weatherData = await weatherResponse.json();
    setWeather({
      name: weatherData.name,
      temp: weatherData.main.temp.toFixed(2),
      description: weatherData.weather[0].description,
    });

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    const dailyForecast = forecastData.list.filter(reading =>
      reading.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    setForecast(
      dailyForecast.map(day => ({
        date: new Date(day.dt_txt).toLocaleDateString(),
        temp: day.main.temp.toFixed(2),
        description: day.weather[0].description,
      }))
    );
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <p>Check the current weather in any city around the world!</p>

      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>🌡️ {weather.temp}°C</p>
          <p>⛅ {weather.description}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <strong>{day.date}</strong>
              <p>🌡️ {day.temp}°C</p>
              <p>⛅ {day.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="buttons">
        <button onClick={getWeather}>📍 Use My Location</button>
        <button onClick={getWeather}>🗓️ 5-Day Forecast</button>
        <button onClick={toggleTheme}>🌓 Switch Theme</button>
      </div>
    </div>
  );
}

export default App;
