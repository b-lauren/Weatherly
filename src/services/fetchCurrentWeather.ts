import axios from "axios"
import { API_KEY } from "@env"

export interface CurrentWeather {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: {
    main: string
  }[]
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
}

interface FetchWeatherParams {
  lat: number
  lon: number
}

export const fetchCurrentWeatherAPI = async ({
  lat,
  lon,
}: FetchWeatherParams): Promise<{ data: CurrentWeather }> => {
  const response = await axios.get<CurrentWeather>(
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
        lang: "en",
      },
    }
  )
  return response
}
