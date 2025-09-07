import React from 'react';

const WeatherCard = ({ weather, uvIndex }) => {
  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const getUVIndexColor = (uv) => {
    if (uv <= 2) return 'text-green-500';
    if (uv <= 5) return 'text-yellow-500';
    if (uv <= 7) return 'text-orange-500';
    if (uv <= 10) return 'text-red-500';
    return 'text-purple-500';
  };

  const getUVIndexLabel = (uv) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center">
        <p className="text-gray-500">Enter a city name to see current weather</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{weather.city}</h2>
          <p className="text-blue-100">{weather.country}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={getWeatherIconUrl(weather.icon)} 
            alt={weather.description}
            className="w-16 h-16 mr-4"
          />
          <div>
            <div className="text-4xl font-bold">{weather.temperature}°C</div>
            <p className="text-blue-100 capitalize">{weather.description}</p>
          </div>
        </div>
        
        <div className="text-right space-y-1">
          <div className="text-sm">
            <span className="text-blue-200">Feels like:</span> {weather.feelsLike}°C
          </div>
          <div className="text-sm">
            <span className="text-blue-200">Humidity:</span> {weather.humidity}%
          </div>
          <div className="text-sm">
            <span className="text-blue-200">Wind:</span> {weather.windSpeed} m/s
          </div>
          {uvIndex !== null && (
            <div className="text-sm">
              <span className="text-blue-200">UV Index:</span> 
              <span className={`ml-1 font-semibold ${getUVIndexColor(uvIndex)}`}>
                {uvIndex} ({getUVIndexLabel(uvIndex)})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;