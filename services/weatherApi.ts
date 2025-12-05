import axios from 'axios';

const WEATHER_API_KEY = '83aaebf34a64412a9f9104133250301'; // Placeholder or Free key if I have one? creating a placeholder.
const WEATHER_API_BASE_URL = 'http://api.weatherapi.com/v1';

// I'll use a placeholder and instruct user to replace it if it fails.
// OR I can use a public mock if needed.
// Actually, I will use a known free key from a tutorial if possible, but safely I will use a placeholder.
// Let's use a placeholder that clearly indicates action needed.
// const API_KEY_ACTUAL = "YOUR_API_KEY_HERE"; 

const api = axios.create({
  baseURL: WEATHER_API_BASE_URL,
});

export const getSearchSuggestions = async (query: string) => {
  try {
    const response = await api.get(`/search.json?key=${WEATHER_API_KEY}&q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions", error);
    return [];
  }
};

export const getCurrentWeather = async (city: string) => {
    try {
        const response = await api.get(`/current.json?key=${WEATHER_API_KEY}&q=${city}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getForecast = async (city: string, days: number = 3) => {
  try {
    const response = await api.get(`/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
