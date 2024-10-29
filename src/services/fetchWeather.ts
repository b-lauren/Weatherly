import axios from "axios"
import { API_KEY } from "@env"

interface FetchWeatherParams {
    lat: number
    lon: number
}

export const fetchWeatherAPI = async ({lat, lon}: FetchWeatherParams) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: "metric",
            lang: 'en',
          },
        }
      )
      console.log('response', response);
      return response;
}