import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { RouteProp, useRoute } from "@react-navigation/native"
import axios from "axios"
import { MainStackParamList } from "../navigation/MainStack"
import { API_KEY } from "@env"
import ForecastCard from "../components/ForecastCard"

interface ForecastItem {
  dt: number
  main: {
    temp: number
  }
  weather: {
    description: string
  }[]
}

interface ForecastData {
  list: ForecastItem[]
}

export const ForecastScreen = () => {
  const route = useRoute<RouteProp<MainStackParamList, "WeeklyForecast">>()
  const { cityName, latitude, longitude } = route.params

  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchForecast = async () => {
      try {
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
        setForecastData(response.data)
      } catch (error) {
        setError("Error fetching forecast data")
      }
    }

    fetchForecast()
  }, [latitude, longitude])

  const renderLoading = () => (
    <Text style={styles.loadingText}>Loading forecast...</Text>
  )

  const renderForecast = () =>
    forecastData?.list.map((item, index) => {
      if (index < 5) {
        const date = new Date(item.dt * 1000)
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
        const dayOfMonth = date.getDate()
        const monthName = date.toLocaleDateString("en-US", { month: "short" })

        return (
          <ForecastCard
            key={index}
            day={dayName}
            date={monthName}
            month={dayOfMonth}
            description={item.weather[0].description}
            temperature={Math.trunc(item.main.temp)}
          />
        )
      }
      return null
    })

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D5A6C", "#1E9BA6", "#0D5A6C"]}
        style={{ flex: 1 }}
      >
        <Text style={styles.cityText}>{cityName}</Text>
        {forecastData ? renderForecast() : renderLoading()}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5A6C",
  },
  cityText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    fontSize: 20,
  },
  forecastText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  loadingText: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
})

export default ForecastScreen
