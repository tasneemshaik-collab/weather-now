import React, { useState } from 'react';
import './App.css';

const API_KEY = 'd31120fef343431863eb0d63f927e140'; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState('light');
  const [showForecast, setShowForecast] = useState(false);

  const fetchWeather = async (cityName) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=40&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      // Get 5 unique days from forecast
      const daily = forecastData.list.filter((item, index) => index % 8 === 0);
      setForecast(daily);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather(city);
    }
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            setCity(data.name);
            setWeather(data);
            return fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=40&appid=${API_KEY}`
            );
          })
          .then((res) => res.json())
          .then((data) => {
            const daily = data.list.filter((item, index) => index % 8 === 0);
            setForecast(daily);
          });
      },
      (err) => console.error('Geolocation error:', err)
    );
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <p>Get the current weather and forecast anywhere!</p>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Get Weather</button>
      </div>
      <div className="button-group">
        <button onClick={handleLocation}>📍 Use My Location</button>
        <button onClick={toggleTheme}>🌓 Switch Theme</button>
        <button onClick={() => setShowForecast(!showForecast)}>
          📅 {showForecast ? 'Hide Forecast' : '5-Day Forecast'}
        </button>
      </div>

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>🌤️ {weather.weather[0].description}</p>
        </div>
      )}

      {showForecast && forecast.length > 0 && (
        <div className="forecast">
          {forecast.map((day, idx) => (
            <div key={idx} className="forecast-card">
              <h4>{new Date(day.dt_txt).toLocaleDateString()}</h4>
              <p>🌡️ {day.main.temp}°C</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
