import React from "react";

const ForecastDisplay = ({ forecast }) => {
  return (
    <div className="forecast-container">
      {forecast.map((day, idx) => (
        <div className="forecast-card" key={idx}>
          <h3>{new Date(day.dt_txt).toLocaleDateString()}</h3>
          <p>🌡️ {day.main.temp}°C</p>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastDisplay;
