import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentWeather, getForecast, getSearchSuggestions } from '../services/weatherApi';

interface WeatherState {
  current: any | null;
  forecast: any | null;
  searchResults: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCity: string | null;
}

const initialState: WeatherState = {
  current: null,
  forecast: null,
  searchResults: [],
  status: 'idle',
  error: null,
  selectedCity: null,
};

export const fetchWeatherAndForecast = createAsyncThunk(
  'weather/fetchWeatherAndForecast',
  async ({ city, days }: { city: string; days: number }) => {
    const current = await getCurrentWeather(city);
    const forecast = await getForecast(city, days);
    return { current, forecast };
  }
);

export const searchCities = createAsyncThunk(
    'weather/searchCities',
    async (query: string) => {
        const results = await getSearchSuggestions(query);
        return results;
    }
);

import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadWeatherFromStorage = createAsyncThunk(
    'weather/loadFromStorage',
    async () => {
        const jsonValue = await AsyncStorage.getItem('@weather_data');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearSearchResults(state) {
        state.searchResults = [];
    },
    resetError(state) {
        state.error = null;
    },
    setDays(state, action: PayloadAction<number>) {
        // Just a placeholder if we want to store preference, 
        // but simple app triggers fetch with new days.
    }
  },
  extraReducers: (builder) => {
    builder
        // Search
      .addCase(searchCities.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
        // Fetch Weather
      .addCase(fetchWeatherAndForecast.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeatherAndForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload.current;
        state.forecast = action.payload.forecast;
        state.selectedCity = action.payload.current.location.name;
        // Save to storage
        AsyncStorage.setItem('@weather_data', JSON.stringify({
            current: action.payload.current,
            forecast: action.payload.forecast,
            city: action.payload.current.location.name,
            timestamp: Date.now()
        })).catch(err => console.error("Failed to save weather", err));
      })
      .addCase(fetchWeatherAndForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch weather';
      })
       // Load from Storage
      .addCase(loadWeatherFromStorage.fulfilled, (state, action) => {
          if (action.payload) {
              state.current = action.payload.current;
              state.forecast = action.payload.forecast;
              state.selectedCity = action.payload.city;
              state.status = 'succeeded'; // Show cached data as success
          }
      });
  },
});

export const { clearSearchResults, resetError, setDays } = weatherSlice.actions;
export default weatherSlice.reducer;
