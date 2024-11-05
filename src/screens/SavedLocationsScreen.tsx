import React, { useEffect, useState } from "react"
import { Text, StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { store$ } from "../storage/storeFavourites"
import {
  CurrentWeather,
  fetchCurrentWeatherAPI,
} from "../services/fetchCurrentWeather"
import ForecastCard from "../components/ForecastCard"
import StatusMessage from "../components/StatusMessage"

const SavedLocationsScreen = () => {
  const cities = store$.cities.get()
  const [cityWeatherData, setCityWeatherData] = useState<CurrentWeather[]>([])
  const [error, setError] = useState<string>("")

  const fetchCityWeather = async (city: string) => {
    try {
      const response = await fetchCurrentWeatherAPI({ city })
      return { ...response.data, city }
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await Promise.all(cities.map(fetchCityWeather))
        setCityWeatherData(data.filter((item) => item !== null))
      } catch (error) {
        setError(
          "Oops - I can't fetch the forecast for your saved locations right now"
        )
      }
    }
    fetchForecast()
  }, [cities])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D5A6C", "#1E9BA6", "#0D5A6C"]}
        style={{ flex: 1 }}
      >
        {error ? (
          <StatusMessage subtitle={error}></StatusMessage>
        ) : cities.length === 0 ? (
          <StatusMessage subtitle="Why not add some of your favourite locations? 💙" />
        ) : (
          cityWeatherData.map((city) => (
            <View key={city.name}>
              <Text style={styles.cityName}>{city.name}</Text>
              <ForecastCard
                temperature={Math.round(city.main.temp)}
                icon={city.weather[0].icon}
              />
            </View>
          ))
        )}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5A6C",
  },
  cityName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 6,
    marginTop: 15,
  },
})

export default SavedLocationsScreen
