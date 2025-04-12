export async function getCoordinates(city, apiKey) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    return { lat: data.coord.lat, lon: data.coord.lon };
  }
  
  export async function getForecastData(lat, lon, apiKey) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
  
    if (!data.daily || !Array.isArray(data.daily)) {
      throw new Error("Invalid forecast data structure.");
    }
  
    return data.daily.slice(0, 7);
  }
  
  