import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import IntroAnimation from './components/IntroAnimation';
import ExcelDownloadButton from './components/ExcelDownloadButton';
import { LoadingSpinner, ErrorMessage } from './components/Loading';
import { weatherService } from './services/weatherService';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [uvIndex, setUvIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showIntroAnimation, setShowIntroAnimation] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setShowIntroAnimation(false);
    
    try {
      // Fetch current weather and forecast concurrently
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      
      // Fetch UV index separately
      try {
        const uvData = await weatherService.getUVIndex(
          weatherData.coords.lat, 
          weatherData.coords.lon
        );
        setUvIndex(uvData);
      } catch (uvError) {
        // UV index is optional, continue without it
        setUvIndex(null);
      }
      
      // Start intro animation after data is loaded
      setLoading(false);
      setShowIntroAnimation(true);
      
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast([]);
      setUvIndex(null);
      setLoading(false);
      setShowIntroAnimation(false);
    }
  };

  const handleIntroAnimationComplete = () => {
    setShowIntroAnimation(false);
  };

  const handleRetry = () => {
    if (currentWeather) {
      handleSearch(currentWeather.city);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Intro Animation */}
      {showIntroAnimation && (
        <IntroAnimation 
          weatherData={currentWeather}
          onAnimationComplete={handleIntroAnimationComplete}
        />
      )}
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌤️ Vibe Weather
          </h1>
          <p className="text-gray-600 mb-4">Get accurate weather forecasts for any city</p>
          
          {/* Excel Download Button */}
          <div className="flex justify-center">
            <ExcelDownloadButton 
              currentWeather={currentWeather} 
              forecast={forecast} 
              uvIndex={uvIndex} 
            />
          </div>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}

        {/* Weather Content - only show when not loading and intro animation is not playing */}
        {!loading && !showIntroAnimation && (
          <>
            {/* Current Weather */}
            <WeatherCard weather={currentWeather} uvIndex={uvIndex} />

            {/* 5-Day Forecast */}
            <ForecastList forecasts={forecast} />
          </>
        )}

        {/* Footer */}
        <footer className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Powered by OpenWeatherMap API • Built with React & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
