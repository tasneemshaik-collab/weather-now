import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, main, weather } = weatherData;
  const temperature = main.temp;
  const condition = weather[0].description;

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <p>
        <span role="img" aria-label="thermometer">🌡️</span> {temperature.toFixed(1)}°C
      </p>
      <p>
        <span role="img" aria-label="weather-icon">🌥️</span> {condition}
      </p>
    </div>
  );
};

export default WeatherDisplay;
