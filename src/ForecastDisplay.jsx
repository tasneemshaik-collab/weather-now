import React from "react";
import "./ForecastDisplay.css";

function ForecastDisplay({ forecast }) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="forecast">
      {forecast.map((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayName = dayNames[date.getDay()];
        const temp = day.temp.day.toFixed(2);
        const icon = day.weather[0].main;

        return (
          <div className="forecast-card" key={index}>
            <h3>{dayName}</h3>
            <p>
              {icon === "Clear" ? "☀️" : icon === "Rain" ? "🌧️" : "☁️"}{" "}
              {icon}
            </p>
            <p>🌡️ {temp}°C</p>
            <p>💧 {day.humidity}%</p>
          </div>
        );
      })}
    </div>
  );
}

export default ForecastDisplay;
