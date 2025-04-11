/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.css';

const API_KEY = 'd31120fef343431863eb0d63f927e140';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState('light');

  const getWeather = async (cityName) => {
    try {
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`);
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);

      setWeather(weatherData);
      setForecast(dailyForecast);
    } catch (error) {
      alert('City not found!');
    }
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);

      setWeather(weatherData);
      setForecast(dailyForecast);
      setCity(weatherData.name);
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1><span role="img" aria-label="cloud">🌦️</span> WeatherNow by Tasneem</h1>
        <p>Get the current weather and forecast anywhere!</p>

        <div className="input-group">
          <input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
          <button onClick={() => getWeather(city)}>Get Weather</button>
        </div>

        <div className="button-group">
          <button onClick={handleLocation}><span role="img" aria-label="location">📍</span> Use My Location</button>
          <button onClick={toggleTheme}><span role="img" aria-label="theme">🌓</span> Switch Theme</button>
        </div>

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <p><span role="img" aria-label="temp">🌡️</span> {weather.main.temp}°C</p>
            <p><span role="img" aria-label="condition">🌤️</span> {weather.weather[0].description}</p>
          </div>
        )}

        {forecast.length > 0 && (
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
    </div>
  );
}

export default App;
