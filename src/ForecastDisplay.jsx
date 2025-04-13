import React from 'react';
import './ForecastDisplay.css';

function ForecastDisplay({ forecast }) {
  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, idx) => (
          <div key={idx} className="forecast-card">
            <p>{day.date}</p>
            <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="icon" />
            <p>{day.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDisplay;
