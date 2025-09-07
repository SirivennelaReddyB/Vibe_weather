import React from 'react';

const ForecastCard = ({ forecast }) => {
  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}.png`;
  };

  const getUVIndexColor = (uv) => {
    if (uv <= 2) return 'text-green-500';
    if (uv <= 5) return 'text-yellow-500';
    if (uv <= 7) return 'text-orange-500';
    if (uv <= 10) return 'text-red-500';
    return 'text-purple-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-gray-800 mb-1">{forecast.day}</h3>
      <p className="text-sm text-gray-500 mb-3">{formatDate(forecast.date)}</p>
      
      <img 
        src={getWeatherIconUrl(forecast.icon)} 
        alt={forecast.description}
        className="w-12 h-12 mx-auto mb-2"
      />
      
      <div className="mb-2">
        <div className="flex justify-center items-center space-x-2">
          <span className="font-bold text-gray-800">{forecast.maxTemp}°</span>
          <span className="text-gray-500">{forecast.minTemp}°</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mb-2 capitalize">{forecast.description}</p>
      
      <div className="space-y-1 text-xs">
        <div>
          <span className="text-gray-500">Humidity:</span> {forecast.humidity}%
        </div>
        <div>
          <span className="text-gray-500">UV Index:</span> 
          <span className={`ml-1 font-semibold ${getUVIndexColor(forecast.uvIndex)}`}>
            {forecast.uvIndex}
          </span>
        </div>
      </div>
    </div>
  );
};

const ForecastList = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-500">5-day forecast will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecasts.map((forecast, index) => (
          <ForecastCard key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;