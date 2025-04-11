import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [theme, setTheme] = useState('light');

  const apiKey = import.meta.env.VITE_API_KEY; // Make sure it's in your .env file

  const getWeather = async (cityName) => {
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
      ]);

      const weather = await weatherRes.json();
      const forecast = await forecastRes.json();

      if (weather.cod === 200 && forecast.cod === "200") {
        setWeatherData(weather);
        const dailyForecast = forecast.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        setForecastData(dailyForecast);
      } else {
        alert('City not found!');
      }
    } catch (error) {
      console.error('Error fetching weather or forecast:', error);
    }
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const [weatherRes, forecastRes] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
          ]);

          const weather = await weatherRes.json();
          const forecast = await forecastRes.json();

          if (weather.cod === 200 && forecast.cod === "200") {
            setWeatherData(weather);
            setCity(weather.name);
            const dailyForecast = forecast.list.filter((reading) =>
              reading.dt_txt.includes("12:00:00")
            );
            setForecastData(dailyForecast);
          }
        } catch (error) {
          console.error('Location fetch error:', error);
        }
      });
    } else {
      alert('Geolocation not supported by your browser.');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <p>Check the current weather and 5-day forecast!</p>

      <div className="search">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => getWeather(city)}>Get Weather</button>
      </div>

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>🌡️ Temp: {weatherData.main.temp}°C</p>
          <p>☁️ Condition: {weatherData.weather[0].description}</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>💨 Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      {forecastData.length > 0 && (
        <div className="forecast">
          <h3>📅 5-Day Forecast</h3>
          <div className="forecast-list">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast-item">
                <p><strong>{new Date(day.dt_txt).toLocaleDateString()}</strong></p>
                <p>🌡️ {day.main.temp}°C</p>
                <p>☁️ {day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3>Explore More</h3>
      <div className="extras">
        <button onClick={getLocationWeather}>📍 Use My Location</button>
        <button onClick={toggleTheme}>🎨 Switch Theme</button>
      </div>
    </div>
  );
};

export default App;
