import React, { useEffect, useState } from 'react';

const IntroAnimation = ({ weatherData, onAnimationComplete }) => {
  const [phase, setPhase] = useState('sunrise'); // 'sunrise', 'weather', 'sunset'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 6000; // 6 seconds total
    const interval = 50; // Update every 50ms
    const totalSteps = duration / interval;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / totalSteps) * 100;
      setProgress(newProgress);
      
      // Phase transitions
      if (newProgress < 25) {
        setPhase('sunrise');
      } else if (newProgress < 75) {
        setPhase('weather');
      } else {
        setPhase('sunset');
      }
      
      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          onAnimationComplete();
        }, 500);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [onAnimationComplete]);

  const getWeatherAnimation = () => {
    if (!weatherData) return 'sunny';
    
    const description = weatherData.description.toLowerCase();
    if (description.includes('rain') || description.includes('drizzle')) {
      return 'rainy';
    } else if (description.includes('cloud')) {
      return 'cloudy';
    } else if (description.includes('snow')) {
      return 'snowy';
    } else if (description.includes('clear') || description.includes('sun')) {
      return 'sunny';
    } else if (description.includes('mist') || description.includes('fog')) {
      return 'misty';
    }
    return 'sunny';
  };

  const weatherType = getWeatherAnimation();

  const getFlowerState = () => {
    if (!weatherData) return 'blooming';
    
    const temp = weatherData.temperature;
    const description = weatherData.description.toLowerCase();
    
    if (description.includes('rain')) {
      return 'rainy'; // flowers with raindrops
    } else if (temp > 35) {
      return 'wilted'; // too hot, flowers wilted
    } else if (temp < 0) {
      return 'frozen'; // frozen flowers
    } else if (description.includes('sun') || description.includes('clear')) {
      return 'blooming'; // healthy flowers
    }
    return 'normal';
  };

  const flowerState = getFlowerState();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Sky Background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        phase === 'sunrise' 
          ? 'bg-gradient-to-b from-orange-300 via-yellow-200 to-blue-200'
          : phase === 'sunset'
          ? 'bg-gradient-to-b from-purple-400 via-pink-300 to-orange-200'
          : weatherType === 'rainy'
          ? 'bg-gradient-to-b from-gray-600 via-gray-400 to-gray-300'
          : weatherType === 'cloudy'
          ? 'bg-gradient-to-b from-gray-400 via-blue-200 to-blue-100'
          : weatherType === 'snowy'
          ? 'bg-gradient-to-b from-gray-300 via-white to-blue-50'
          : 'bg-gradient-to-b from-blue-400 via-blue-200 to-blue-50'
      }`}>
        
        {/* Sun */}
        <div className={`absolute transition-all duration-2000 ${
          phase === 'sunrise' 
            ? 'top-3/4 left-8 w-16 h-16' 
            : phase === 'sunset'
            ? 'top-3/4 right-8 w-20 h-20'
            : 'top-8 right-1/4 w-12 h-12'
        }`}>
          <div className={`w-full h-full rounded-full animate-pulse ${
            phase === 'sunrise' || phase === 'sunset' 
              ? 'bg-orange-400 shadow-lg shadow-orange-200' 
              : weatherType === 'sunny'
              ? 'bg-yellow-400 shadow-lg shadow-yellow-200'
              : 'bg-yellow-300 opacity-50'
          }`}></div>
          
          {/* Sun rays */}
          <div className={`absolute inset-0 ${
            weatherType === 'sunny' && phase === 'weather' ? 'animate-spin' : ''
          }`}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 bg-yellow-300 ${
                  phase === 'sunrise' || phase === 'sunset' 
                    ? 'h-6 bg-orange-300' 
                    : 'h-4'
                }`}
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${phase === 'sunrise' || phase === 'sunset' ? '32px' : '24px'})`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Clouds */}
        {(weatherType === 'cloudy' || weatherType === 'rainy') && phase === 'weather' && (
          <>
            <div className="absolute top-16 left-1/4 w-16 h-8 bg-white rounded-full opacity-80 animate-pulse">
              <div className="absolute -top-2 left-4 w-8 h-8 bg-white rounded-full"></div>
              <div className="absolute -top-1 right-2 w-6 h-6 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-24 right-1/3 w-20 h-10 bg-gray-200 rounded-full opacity-70 animate-pulse delay-300">
              <div className="absolute -top-3 left-6 w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="absolute -top-2 right-3 w-7 h-7 bg-gray-200 rounded-full"></div>
            </div>
          </>
        )}

        {/* Rain */}
        {weatherType === 'rainy' && phase === 'weather' && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-300 opacity-60 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        )}

        {/* Snow */}
        {weatherType === 'snowy' && phase === 'weather' && (
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        )}

        {/* City name display */}
        {weatherData && phase === 'weather' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-2 animate-fade-in">
              {weatherData.city}
            </h2>
            <p className="text-xl text-white drop-shadow-md capitalize animate-fade-in delay-500">
              {weatherData.description}
            </p>
          </div>
        )}
      </div>

      {/* Ground and Flowers */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-green-400">
        <div className="absolute inset-0 bg-gradient-to-t from-green-500 to-green-400"></div>
        
        {/* Flowers */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-around items-end">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="relative">
              {/* Stem */}
              <div className={`w-1 bg-green-600 mx-auto ${
                flowerState === 'wilted' ? 'h-3' : 'h-6'
              }`}></div>
              
              {/* Flower */}
              <div className={`relative w-4 h-4 transition-all duration-1000 ${
                flowerState === 'blooming' 
                  ? 'animate-pulse transform scale-110' 
                  : flowerState === 'wilted'
                  ? 'transform rotate-45 scale-75 opacity-60'
                  : flowerState === 'frozen'
                  ? 'opacity-50'
                  : ''
              }`}>
                <div className={`w-full h-full rounded-full ${
                  i % 3 === 0 ? 'bg-red-400' : i % 3 === 1 ? 'bg-yellow-400' : 'bg-pink-400'
                }`}></div>
                
                {/* Raindrops on flowers */}
                {flowerState === 'rainy' && (
                  <div className="absolute -top-1 left-1 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white bg-opacity-30 rounded-full">
        <div 
          className="h-full bg-white rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Phase indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-semibold text-sm drop-shadow-lg">
        {phase === 'sunrise' && '🌅 Sunrise'}
        {phase === 'weather' && '🌤️ Weather'}
        {phase === 'sunset' && '🌇 Sunset'}
      </div>
    </div>
  );
};

export default IntroAnimation;