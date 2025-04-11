import React from "react";
import "./ForecastDisplay.css";

function ForecastDisplay({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.map((item, index) => (
        <div key={index} className="forecast-card">
          <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
          <p>🌡️ {item.main.temp}°C</p>
          <p>{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default ForecastDisplay;
