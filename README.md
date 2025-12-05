# Weather Application

A feature-rich React Native weather application built with Expo, Redux Toolkit, and TypeScript. Get real-time weather data, forecasts, and detailed weather information for cities worldwide.

## Features

✨ **City Search with Autosuggest** - Smart search with city suggestions as you type  
🌡️ **Current Weather** - Real-time temperature, conditions, humidity, and wind speed  
📅 **3-Day Forecast** - Extended weather forecast (expandable with paid API)  
📊 **Detailed View** - Comprehensive weather metrics including UV index, sunrise/sunset, rain probability  
⚙️ **Settings** - Configurable forecast days (3, 5, or 7 days)  
💾 **Offline Support** - Cached data for offline viewing  
🎨 **Beautiful UI** - Gradient backgrounds and smooth animations

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (optional, will be installed via npx)
- **Expo Go** app on your mobile device (for testing)

## Setup Instructions

### 1. Clone or Navigate to Project

```bash
git clone https://github.com/dharmendra841434/WeatherApplication.git
cd /WeatherApplication
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your API Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Copy your API key from the dashboard

> **Note:** The free tier provides 3 days of forecast data. For 5-7 day forecasts, you'll need a paid plan.

### 4. Configure API Key

Open `services/weatherApi.ts` and replace the placeholder with your API key:

```typescript
const WEATHER_API_KEY = "YOUR_API_KEY_HERE";
```

### 5. Start the Application

```bash
npm start
```

Or use Expo CLI directly:

```bash
npx expo start
```

### 6. Run on Your Device

**Option A: Physical Device**

- Install **Expo Go** from App Store (iOS) or Play Store (Android)
- Scan the QR code displayed in your terminal

**Option B: Emulator/Simulator**

- Press `a` for Android emulator
- Press `i` for iOS simulator (Mac only)

## How to Use

### Searching for a City

1. Tap the search bar at the top of the screen
2. Start typing a city name (e.g., "London")
3. Select from the suggested cities that appear
4. Weather data will load automatically

### Viewing Current Weather

After selecting a city, you'll see:

- City name and current date
- Large temperature display
- Weather condition with icon
- Wind speed and humidity

### Checking the Forecast

- Scroll down to see the forecast cards
- Each card shows:
  - Day of the week
  - Weather icon
  - High/Low temperatures
  - Condition description

### Viewing Detailed Forecast

1. Tap any forecast card
2. A detailed screen opens showing:
   - Full date
   - High/Low temperatures
   - Humidity percentage
   - Maximum wind speed
   - Chance of rain/snow
   - UV index
   - Sunrise/Sunset times

### Changing Forecast Days

1. Tap the settings icon (⚙️) next to the forecast title
2. Select 3, 5, or 7 days
3. The app will fetch updated data

> **Note:** Free API keys are limited to 3 days. Selecting more days requires a paid API plan.

### Offline Mode

- The app automatically caches your last weather search
- When offline, you'll see the cached data
- Data refreshes when you reconnect

## Project Structure

```
WeatherApplication/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with Redux Provider
│   ├── index.tsx          # Main home screen
│   └── detail.tsx         # Forecast detail screen
├── components/            # Reusable UI components
│   ├── SearchBar.tsx      # Search with autosuggest
│   ├── CurrentWeather.tsx # Current weather display
│   ├── ForecastList.tsx   # Forecast cards list
│   └── SettingsModal.tsx  # Settings modal
├── redux/                 # State management
│   ├── store.ts          # Redux store configuration
│   └── weatherSlice.ts   # Weather state & actions
├── services/             # API integration
│   └── weatherApi.ts     # WeatherAPI.com integration
└── package.json          # Dependencies
```

## Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **State Management:** Redux Toolkit (with Thunk)
- **Navigation:** Expo Router
- **API:** WeatherAPI.com
- **Storage:** AsyncStorage
- **UI:** Expo Linear Gradient, Vector Icons

## Troubleshooting

### API Key Issues

- Ensure your API key is correctly pasted in `services/weatherApi.ts`
- Check that your API key is active on WeatherAPI.com
- Free tier has rate limits (1 million calls/month)

### Search Not Working

- Check your internet connection
- Verify the API key is valid
- Try searching with more specific city names

### Forecast Shows Only 3 Days

- This is expected with free API tier
- Upgrade to a paid plan for 5-7 day forecasts
- The UI will automatically adjust to available data

## Known Limitations

- **Free API Tier:** Limited to 3 days of forecast data
- **Rate Limits:** 1 million API calls per month on free tier
- **Offline Data:** Only the last successful search is cached

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review WeatherAPI.com documentation
3. Ensure all dependencies are properly installed
