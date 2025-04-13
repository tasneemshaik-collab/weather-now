import React from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ data, city }) {
  return (
    <div className="weather-display">
      <h2>{city}</h2>
      <p>{data.temp}°C</p>
      <p>{data.description}</p>
      <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="weather" />
    </div>
  );
}

export default WeatherDisplay;
