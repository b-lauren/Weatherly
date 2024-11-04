import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { RouteProp, useRoute } from "@react-navigation/native"
import { MainStackParamList } from "../navigation/MainStack"
import ForecastCard from "../components/ForecastCard"
import {
  fetchFiveDayForecastAPI,
  ForecastData,
  ForecastItem,
} from "../services/fetchFiveDayForecast"

const FiveDayForecastScreen = () => {
  const route = useRoute<RouteProp<MainStackParamList, "FiveDayForecast">>()
  const { cityName, latitude, longitude } = route.params

  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetchFiveDayForecastAPI({ latitude, longitude })

        const convertedData: ForecastData = {
          ...response.data,
          list: response.data.list.map((item) => ({
            ...item,
            //store timestamp as a date
            date: new Date(item.dt * 1000),
          })),
        }

        setForecastData(convertedData)
      } catch (error) {
        setError("Error fetching forecast data")
      }
    }

    fetchForecast()
  }, [latitude, longitude])

  const renderLoading = () => (
    <Text style={styles.loadingText}>Loading forecast...</Text>
  )

  const renderForecast = () => {
    if (!forecastData) return null

    const dailyForecasts: ForecastItem[] = []
    const todayDate = new Date().getDate()

    forecastData?.list.map((item) => {
      const day = item.date.getDate()

      if (day === todayDate) {
        return
      }

      // API returns 3 hour forecast for 5 days - only add the first forecast for each day
      if (
        day !== todayDate &&
        !dailyForecasts.some((forecast) => forecast.date.getDate() === day)
      ) {
        dailyForecasts.push(item)
      }
    })

    return dailyForecasts.slice(0, 5).map((item) => {
      const dayName = item.date.toLocaleDateString("en-US", {
        weekday: "short",
      })
      const dayOfMonth = item.date.getDate()
      const monthName = item.date.toLocaleDateString("en-US", {
        month: "short",
      })

      return (
        <ForecastCard
          key={item.dt}
          day={dayName}
          date={dayOfMonth.toString()}
          month={monthName}
          description={item.weather[0].description}
          temperature={Math.trunc(item.main.temp)}
        />
      )
    })
  }

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

export default FiveDayForecastScreen
