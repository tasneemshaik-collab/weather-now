import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import ForecastDisplay from './ForecastDisplay';
import getForecastData from './getForecastData';
import './App.css';
import { toggleTheme, applySavedTheme } from './theme';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('New York');

  useEffect(() => {
    applySavedTheme();
    fetchWeather(location);
  }, [location]);

  const fetchWeather = async (loc) => {
    const data = await getForecastData(loc);
    setWeather(data.current);
    setForecast(data.forecast);
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await getForecastData(`${latitude},${longitude}`);
      setLocation(response.city);
      setWeather(response.current);
      setForecast(response.forecast);
    });
  };

  return (
    <div className="app">
      <header>
        <h1>WeatherNow</h1>
        <button onClick={toggleTheme}>Switch Theme</button>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter city..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') setLocation(e.target.value);
          }}
        />
        <button onClick={handleLocation}>Use My Location</button>
      </div>

      {weather && <WeatherDisplay data={weather} city={location} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

export default App;
