import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Vibe Weather app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Vibe Weather/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search input and button', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Enter city name/i);
  const searchButton = screen.getByRole('button', { name: /search/i });
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('shows placeholder text for weather and forecast', () => {
  render(<App />);
  const weatherPlaceholder = screen.getByText(/Enter a city name to see current weather/i);
  const forecastPlaceholder = screen.getByText(/5-day forecast will appear here/i);
  expect(weatherPlaceholder).toBeInTheDocument();
  expect(forecastPlaceholder).toBeInTheDocument();
});
