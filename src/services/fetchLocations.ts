import axios from "axios"
import { API_KEY } from "@env"

export interface CityData {
  name: string
  lat: number
  lon: number
  country: string
}

export interface FetchLocationsParams {
  cityName: string
}

export const fetchLocationsAPI = async ({
  cityName,
}: FetchLocationsParams): Promise<{ data: CityData[] }> => {
  const response = await axios.get<CityData[]>(
    `https://api.openweathermap.org/geo/1.0/direct`,
    {
      params: {
        q: cityName,
        limit: 5,
        appid: API_KEY,
        lang: "en",
      },
    }
  )
  return response
}
