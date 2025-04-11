import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;
    try {
      const apiKey = import.meta.env.VITE_API_KEY;

      // ✅ Debug: log the full URL
      console.log(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        alert(data.message || 'City not found!');
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="App">
      <h1>🌤 WeatherNow</h1>
      <h3>Tasneem Shaik</h3>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
