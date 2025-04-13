import React from "react";
import "./ForecastDisplay.css";

function ForecastDisplay({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.map((item, index) => (
        <div key={index} className="forecast-card">
          <h4>{new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: "short" })}</h4>
          <p>{item.weather[0].main}</p>
          <p>🌡 {item.main.temp}°C</p>
          <p>💧 {item.main.humidity}%</p>
        </div>
      ))}
    </div>
  );
}

export default ForecastDisplay;
