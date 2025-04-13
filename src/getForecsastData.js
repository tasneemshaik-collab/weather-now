const API_KEY = 'your_api_key_here';

async function getForecastData(location) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
  );
  const data = await res.json();

  const city = data.city.name;
  const current = {
    temp: data.list[0].main.temp,
    description: data.list[0].weather[0].description,
    icon: data.list[0].weather[0].icon,
  };

  // Get 5-day forecast (every 8th item = next day at same time)
  const forecast = data.list
    .filter((_, idx) => idx % 8 === 0)
    .slice(1, 6)
    .map((item) => ({
      date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
    }));

  return { city, current, forecast };
}

export default getForecastData;
