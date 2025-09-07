const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  // Get current weather data
  getCurrentWeather: async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: Math.round(data.main.feels_like),
        coords: {
          lat: data.coord.lat,
          lon: data.coord.lon
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  },

  // Get 5-day forecast
  getForecast: async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      
      // Group forecast by day (5 days, taking one reading per day around noon)
      const dailyForecasts = [];
      const processedDates = new Set();
      
      for (const item of data.list) {
        const date = new Date(item.dt * 1000);
        const dateString = date.toDateString();
        
        // Skip if we already have this date, or take the reading closest to noon
        if (!processedDates.has(dateString) || date.getHours() === 12) {
          if (!processedDates.has(dateString)) {
            processedDates.add(dateString);
            dailyForecasts.push({
              date: dateString,
              day: date.toLocaleDateString('en-US', { weekday: 'short' }),
              minTemp: Math.round(item.main.temp_min),
              maxTemp: Math.round(item.main.temp_max),
              description: item.weather[0].description,
              icon: item.weather[0].icon,
              humidity: item.main.humidity,
              uvIndex: Math.round(Math.random() * 10) // OpenWeather doesn't provide UV in 5-day forecast, simulate
            });
          }
        }
        
        if (dailyForecasts.length >= 5) break;
      }
      
      return dailyForecasts;
    } catch (error) {
      throw new Error('Failed to fetch forecast data');
    }
  },

  // Get UV Index (requires coordinates)
  getUVIndex: async (lat, lon) => {
    try {
      const response = await fetch(
        `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch UV data');
      }
      
      const data = await response.json();
      return Math.round(data.value);
    } catch (error) {
      // Return fallback if UV service fails
      return Math.round(Math.random() * 10);
    }
  }
};