import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import * as Location from "expo-location"
import axios from "axios"
import { NavBar } from "../components/NavBar"
import { WeatherBanner } from "../components/WeatherBanner"

interface Weather {
  name: string
  main: {
    temp: number
  }
  weather: {
    main: string
  }[]
  sys: {
    country: string
  }
}

const HomeScreen = () => {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setError("Permission to access location was denied")
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = location.coords
      console.log("Latitude:", latitude, "Longitude:", longitude)
      fetchWeather(latitude, longitude)
    }

    getLocationAndFetchWeather()
  }, [])

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      console.log("Fetching weather data for lat:", lat, "lon:", lon)
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          data: undefined,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            lat,
            lon,
            appid: "11ca8e67cea289ea16112f8044135194",
            units: "metric",
          },
        }
      )
      setWeather(response.data)
      console.log("response.data", response.data)
    } catch (err) {
    //   console.error("Error details:", err.response?.data || err.message)
      console.log(JSON.stringify(err, null, 2))
      setError("Error fetching weather data")
    }
  }

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <View style={styles.container}>
      <NavBar
        label="Saved"
        iconName="add"
        onLabelPress={() => console.log("Label pressed")}
        onIconPress={() => console.log("Icon pressed")}
      />
      {weather ? (
        <WeatherBanner
          location={weather.name}
          country={weather.sys.country}
          temperature={weather.main.temp}
          description={weather.weather[0].main}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5A6C",
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
})

export default HomeScreen