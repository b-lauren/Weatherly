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
    icon: string
  }[]
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
}

interface FetchWeatherParams {
  lat?: number
  lon?: number
  city?: string
}

export const fetchCurrentWeatherAPI = async ({
  lat,
  lon,
  city,
}: FetchWeatherParams): Promise<{ data: CurrentWeather }> => {

  if (!city && (!lat || !lon)) {
    throw new Error("Either a city name or both latitude and longitude are required")
  }

  const params = {
    q: city || undefined,
    lat: city ? undefined : lat,
    lon: city ? undefined : lon,
    appid: API_KEY,
    units: "metric",
    lang: "en",
  }

  const response = await axios.get<CurrentWeather>(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params,
    }
  )
  return response
}
