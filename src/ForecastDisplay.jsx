import React from "react";
import "./ForecastDisplay.css";

// Map weather condition to emoji
const emojiMap = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Smoke: "🌫️",
  Haze: "🌫️",
  Dust: "🌫️",
  Fog: "🌫️",
  Sand: "🌫️",
  Ash: "🌋",
  Squall: "🌬️",
  Tornado: "🌪️",
};

function ForecastDisplay({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.map((item, index) => {
        const date = new Date(item.dt_txt).toLocaleDateString(undefined, {
          weekday: "short",
        });
        const weatherMain = item.weather[0].main;
        const emoji = emojiMap[weatherMain] || "🌈"; // default emoji

        return (
          <div key={index} className="forecast-card">
            <h4>{date}</h4>
            <div className="forecast-emoji">{emoji}</div>
            <p>{weatherMain}</p>
            <p>🌡 {item.main.temp}°C</p>
            <p>💧 {item.main.humidity}%</p>
          </div>
        );
      })}
    </div>
  );
}

export default ForecastDisplay;
