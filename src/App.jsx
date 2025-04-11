import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return alert('Please enter a city name');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      );

      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        alert(data.message);
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="app">
      <h1>🌦️ WeatherNow by Tasneem</h1>
      <p>Check the current weather in any city around the world!</p>

      {/* Input for city */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {/* Weather info display */}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      {/* Extra buttons for fun */}
      <div className="extra-buttons">
        <h3>Explore More</h3>
        <button onClick={() => alert("📍 Location feature coming soon!")}>📍 Use My Location</button>
        <button onClick={() => alert("📅 Forecast feature coming soon!")}>📅 5-Day Forecast</button>
        <button onClick={() => alert("🎨 Theme switcher coming soon!")}>🎨 Switch Theme</button>
      </div>
    </div>
  );
}

export default App;
