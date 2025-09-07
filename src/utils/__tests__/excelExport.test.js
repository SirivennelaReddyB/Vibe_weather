import { exportWeatherDataToExcel } from '../excelExport';

// Mock data for testing
const mockCurrentWeather = {
  city: 'Test City',
  country: 'TC',
  temperature: 25,
  feelsLike: 28,
  description: 'sunny',
  humidity: 60,
  windSpeed: 5,
  coords: {
    lat: 40.7128,
    lon: -74.0060
  }
};

const mockForecast = [
  {
    day: 'Mon',
    date: 'Sep 7',
    minTemp: 20,
    maxTemp: 30,
    description: 'clear sky',
    humidity: 55,
    uvIndex: 5
  },
  {
    day: 'Tue',
    date: 'Sep 8',
    minTemp: 18,
    maxTemp: 28,
    description: 'partly cloudy',
    humidity: 65,
    uvIndex: 4
  }
];

describe('Excel Export Functionality', () => {
  test('exportWeatherDataToExcel function exists and can be called', () => {
    expect(typeof exportWeatherDataToExcel).toBe('function');
    
    // This should not throw an error
    expect(() => {
      exportWeatherDataToExcel(mockCurrentWeather, mockForecast, 6);
    }).not.toThrow();
  });

  test('function handles null/undefined data gracefully', () => {
    expect(() => {
      exportWeatherDataToExcel(null, null, null);
    }).not.toThrow();

    expect(() => {
      exportWeatherDataToExcel(undefined, undefined, undefined);
    }).not.toThrow();
  });

  test('function handles partial data', () => {
    expect(() => {
      exportWeatherDataToExcel(mockCurrentWeather, null, null);
    }).not.toThrow();

    expect(() => {
      exportWeatherDataToExcel(null, mockForecast, 5);
    }).not.toThrow();
  });
});