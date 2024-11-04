import axios from "axios"
import { API_KEY } from "@env"

export interface FetchForecastParams {
  latitude: number
  longitude: number
}

export interface ForecastItem {
  dt: number
  date: Date
  main: {
    temp: number
  }
  weather: {
    description: string
  }[]
}

export interface ForecastData {
  list: ForecastItem[]
}

export const fetchFiveDayForecastAPI = async ({
  latitude,
  longitude,
}: FetchForecastParams): Promise<{ data: ForecastData }> => {
  const response = await axios.get<ForecastData>(
    `https://api.openweathermap.org/data/2.5/forecast`,
    {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
      },
    }
  )
  return response
}
