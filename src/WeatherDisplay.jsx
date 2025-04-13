import React from "react";
import "./WeatherDisplay.css";

function WeatherDisplay({ weather }) {
  const { name, main, weather: info, wind } = weather;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{info[0].description}</p>
      <p>🌡 Temp: {main.temp}°C</p>
      <p>💨 Wind: {wind.speed} m/s</p>
      <p>💧 Humidity: {main.humidity}%</p>
    </div>
  );
}

export default WeatherDisplay