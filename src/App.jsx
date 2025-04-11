import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState('light');
  const [showForecast, setShowForecast] = useState(false);

  const API_KEY = 'd31120fef343431863eb0d63f927e140'; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getForecast = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      const daily = data.list.filter((_, index) => index % 8 === 0);
      setForecast(daily);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleForecast = async () => {
    if (!showForecast && city) await getForecast();
    setShowForecast(prev => !prev);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleUseLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setCity(data.name);
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>🌦️ WeatherNow by Tasneem</h1>
        <p>Check the current weather in any city around the world!</p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <p>🌡️ {weather.main.temp}°C</p>
            <p>🌤️ {weather.weather[0].description}</p>
          </div>
        )}

        {showForecast && forecast.length > 0 && (
          <div className="forecast-container">
            {forecast.map((item, index) => (
              <div className="forecast-card" key={index}>
                <strong>{new Date(item.dt_txt).toLocaleDateString()}</strong>
                <p>🌡️ {item.main.temp}°C</p>
                <p>🌤️ {item.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}

        <h3>Explore More</h3>
        <div className="buttons">
          <button onClick={handleUseLocation}>📍 Use My Location</button>
          <button onClick={toggleForecast}>🗓️ 5-Day Forecast</button>
          <button onClick={toggleTheme}>🎨 Switch Theme</button>
        </div>
      </div>
    </div>
  );
};

export default App;
