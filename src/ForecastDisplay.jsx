// src/ForecastDisplay.jsx
import React from 'react';
import './ForecastDisplay.css';

const emojiMap = {
  Clear: '☀️',
  Rain: '🌧️',
  Clouds: '☁️',
  Snow: '❄️',
  Thunderstorm: '⛈️',
  Drizzle: '🌦️',
  Mist: '🌫️',
  Smoke: '💨',
};

const ForecastDisplay = ({ forecast }) => {
  return (
    <div className="forecast-container">
      {forecast.map((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const weatherMain = day.weather[0].main;
        const emoji = emojiMap[weatherMain] || '❔';

        return (
          <div className="forecast-card" key={index}>
            <div className="day">{dayName}</div>
            <div className="emoji">{emoji}</div>
            <div className="temp">🌡️ {day.temp.day.toFixed(2)}°C</div>
            <div className="humidity">💧 {day.humidity}%</div>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastDisplay;
