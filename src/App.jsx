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
      alert('Error fetching weather');
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ WeatherNow</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>🌥️ Weather: {weather.weather[0].description}</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
