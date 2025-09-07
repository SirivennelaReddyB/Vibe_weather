import React from 'react';
import { exportWeatherDataToExcel } from '../utils/excelExport';

const ExcelDownloadButton = ({ currentWeather, forecast, uvIndex }) => {
  const handleDownload = () => {
    exportWeatherDataToExcel(currentWeather, forecast, uvIndex);
  };

  // Only show button if we have weather data
  if (!currentWeather) {
    return null;
  }

  return (
    <button
      onClick={handleDownload}
      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      title={`Download weather data for ${currentWeather.city} as Excel file`}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      <span className="text-sm font-medium">Download Excel</span>
    </button>
  );
};

export default ExcelDownloadButton;