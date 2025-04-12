import React from "react";
import "./ForecastDisplay.css";

function ForecastDisplay({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.map((item, index) => {
        const date = new Date(item.dt_txt).toLocaleDateString(undefined, {
          weekday: "short",
        });
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        return (
          <div key={index} className="forecast-card">
            <h4>{date}</h4>
            <img src={iconUrl} alt={item.weather[0].description} className="forecast-icon" />
            <p>{item.weather[0].main}</p>
            <p>🌡 {item.main.temp}°C</p>
            <p>💧 {item.main.humidity}%</p>
          </div>
        );
      })}
    </div>
  );
}

export default ForecastDisplay;
