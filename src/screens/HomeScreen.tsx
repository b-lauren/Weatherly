import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import * as Location from "expo-location"
import axios from "axios"
import { WeatherBanner } from "../components/WeatherBanner"
import IconButton from "../components/IconButton"
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/native"
import { MainStackParamList } from "../navigation/MainStack"
import { API_KEY } from "@env"

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

  const navigation = useNavigation<NavigationProp<MainStackParamList>>()
  const route = useRoute<RouteProp<MainStackParamList, "Home">>()

  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      // If route parameters are provided, use them instead of the current location
      if (route.params) {
        const { latitude, longitude } = route.params
        fetchWeather(latitude, longitude)
      } else {
        // Otherwise, get the user's current location
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
    }

    getLocationAndFetchWeather()
  }, [route.params])

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
            appid: API_KEY,
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

  const navigateToScreen = (screen: keyof MainStackParamList) => {
    navigation.navigate(screen)
  }

  console.log("API Key:", API_KEY)

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <View style={styles.container}>
      {weather ? (
        <>
          <WeatherBanner
            location={weather.name}
            country={weather.sys.country}
            temperature={weather.main.temp}
            description={weather.weather[0].main}
          />
          {/* <Text> Add more info about current weather conditions</Text> */}
          <IconButton
            iconName="calendar"
            title="View weekly forecast"
            onPress={() => navigateToScreen("WeeklyForecast")}
          />
        </>
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
