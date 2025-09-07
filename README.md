# 🌤️ Vibe Weather

A modern, responsive React weather application that provides current weather conditions and 5-day forecasts for any city worldwide.

## Features

- **Current Weather**: Real-time temperature, weather conditions, humidity, wind speed, and UV index
- **5-Day Forecast**: Detailed daily forecasts with min/max temperatures, weather icons, and UV predictions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Real-time Data**: Powered by OpenWeatherMap API for accurate weather information

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SirivennelaReddyB/Vibe_weather.git
cd Vibe_weather
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
The `.env` file already contains a working API key, but you can replace it with your own OpenWeatherMap API key if needed.

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Enter a city name in the search bar
2. Press "Search" or hit Enter
3. View current weather conditions and 5-day forecast
4. The app displays:
   - Current temperature and weather description
   - Weather icon representation
   - Humidity, wind speed, and feels-like temperature
   - UV index with color-coded severity levels
   - 5-day forecast with daily min/max temperatures

## Project Structure

```
src/
├── components/
│   ├── WeatherCard.js      # Current weather display
│   ├── ForecastList.js     # 5-day forecast grid
│   ├── SearchBar.js        # City search input
│   └── Loading.js          # Loading and error components
├── services/
│   └── weatherService.js   # OpenWeatherMap API integration
├── App.js                  # Main application component
├── index.js               # Application entry point
└── index.css              # Global styles with Tailwind
```

## Technologies Used

- **React**: Modern functional components with hooks
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **OpenWeatherMap API**: Weather data provider
- **Create React App**: Development environment and build tools

## API Configuration

The app uses the OpenWeatherMap API. The default API key is included for demonstration purposes. For production use:

1. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the value in `.env`:
```
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

## Building for Production

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized static files ready for deployment.

## Deployment

The app is ready for deployment to platforms like:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `build` folder or connect via Git
- **GitHub Pages**: Use the `gh-pages` package for easy deployment
- **Heroku**: Add a server.js file for Express hosting

### Deploy to Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d build"`
3. Run: `npm run build && npm run deploy`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and design inspiration from modern weather applications
- Built with Create React App and Tailwind CSS
