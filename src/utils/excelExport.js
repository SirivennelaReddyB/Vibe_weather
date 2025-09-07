import * as XLSX from 'xlsx';

export const exportWeatherDataToExcel = (currentWeather, forecast, uvIndex) => {
  // Prepare current weather data
  const currentWeatherData = [];
  if (currentWeather) {
    currentWeatherData.push({
      'Data Type': 'Current Weather',
      'City': currentWeather.city,
      'Country': currentWeather.country,
      'Date': new Date().toLocaleDateString(),
      'Temperature (°C)': currentWeather.temperature,
      'Feels Like (°C)': currentWeather.feelsLike,
      'Description': currentWeather.description,
      'Humidity (%)': currentWeather.humidity,
      'Wind Speed (m/s)': currentWeather.windSpeed,
      'UV Index': uvIndex || 'N/A',
      'Coordinates': `${currentWeather.coords?.lat || 'N/A'}, ${currentWeather.coords?.lon || 'N/A'}`
    });
  }

  // Prepare forecast data
  const forecastData = [];
  if (forecast && forecast.length > 0) {
    forecast.forEach((day, index) => {
      forecastData.push({
        'Data Type': '5-Day Forecast',
        'Day': day.day,
        'Date': day.date,
        'Min Temperature (°C)': day.minTemp,
        'Max Temperature (°C)': day.maxTemp,
        'Description': day.description,
        'Humidity (%)': day.humidity,
        'UV Index': day.uvIndex || 'N/A'
      });
    });
  }

  // Check if we have any data to export
  if (currentWeatherData.length === 0 && forecastData.length === 0) {
    console.warn('No weather data available to export');
    return;
  }

  // Create workbook
  const workbook = XLSX.utils.book_new();

  // Add current weather sheet
  if (currentWeatherData.length > 0) {
    const currentWeatherSheet = XLSX.utils.json_to_sheet(currentWeatherData);
    XLSX.utils.book_append_sheet(workbook, currentWeatherSheet, 'Current Weather');
  }

  // Add forecast sheet
  if (forecastData.length > 0) {
    const forecastSheet = XLSX.utils.json_to_sheet(forecastData);
    XLSX.utils.book_append_sheet(workbook, forecastSheet, '5-Day Forecast');
  }

  // Generate filename with city and date
  const city = currentWeather?.city || 'weather';
  const date = new Date().toISOString().split('T')[0];
  const filename = `${city}_weather_${date}.xlsx`;

  // Write and download file
  XLSX.writeFile(workbook, filename);
};