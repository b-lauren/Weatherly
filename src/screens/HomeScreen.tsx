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
import { LinearGradient } from "expo-linear-gradient"
import { fetchWeatherAPI } from "../services/fetchWeather"
import Entypo from "@expo/vector-icons/Entypo"
import { store$ } from "../storage/storeFavourites"
import { observer } from "@legendapp/state/react"
import { CurrentConditionsCard } from "../components/CurrentConditionsCard"

interface Weather {
  name: string
  main: {
    temp: number
    feels_like: number
    // pressure: number
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

const HomeScreen = observer(() => {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [error, setError] = useState<string>("")
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)

  const navigation = useNavigation<NavigationProp<MainStackParamList>>()
  const route = useRoute<RouteProp<MainStackParamList, "Home">>()

  const isCitySaved = (city: string) => store$.cities.get().includes(city)

  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      // If route parameters are provided, use them instead of the current location
      if (route.params) {
        const { latitude, longitude } = route.params
        setLatitude(latitude)
        setLongitude(longitude)
        fetchWeather(latitude, longitude)
      } else {
        // Otherwise, get the user's current location
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          setError(
            "Location access denied. Please enable location permissions or search for a city manually to view the current forecast."
          )
          return
        }

        const location = await Location.getCurrentPositionAsync({})
        const { latitude, longitude } = location.coords
        console.log("Latitude:", latitude, "Longitude:", longitude)
        setLatitude(latitude)
        setLongitude(longitude)
        fetchWeather(latitude, longitude)
      }
    }

    getLocationAndFetchWeather()
  }, [route.params])

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      console.log("Fetching weather data for lat:", lat, "lon:", lon)

      const response = await fetchWeatherAPI({ lat, lon })
      setWeather(response.data)
      console.log("response.data", response.data)
    } catch (err) {
      //   console.error("Error details:", err.response?.data || err.message)
      console.log(JSON.stringify(err, null, 2))
      setError("Error fetching weather data")
    }
  }

  const navigateToWeeklyForecast = () => {
    if (latitude !== null && longitude !== null && weather) {
      navigation.navigate("WeeklyForecast", {
        latitude,
        longitude,
        cityName: weather.name,
      })
      console.log("navigating to weekly forecast", latitude, longitude)
    }
  }

  if (error) {
    return <Text>{error}</Text>
  }

  console.log("weather", weather)

  const saveLocation = (city: string) => {
    if (isCitySaved(city)) {
      store$.removeCity(city)
    } else {
      store$.addCity(city)
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D5A6C", "#1E9BA6", "#0D5A6C"]}
        style={{ flex: 1 }}
      >
        {weather ? (
          <>
            <WeatherBanner
              location={weather.name}
              country={weather.sys.country}
              temperature={weather.main.temp}
              description={weather.weather[0].main}
            />
            <View style={styles.conditionsContainer}>
              <Entypo
                name={isCitySaved(weather.name) ? "heart" : "heart-outlined"}
                size={24}
                color="white"
                onPress={() => saveLocation(weather.name)}
              />

              <View style={styles.cardsRow}>
                <CurrentConditionsCard
                  title="Feels like"
                  value={`${Math.round(weather.main.feels_like)}°c`}
                />
                <CurrentConditionsCard
                  title="Wind speed"
                  value={`${weather.wind.speed} m/s`}
                />
                <CurrentConditionsCard
                  title="Humidity"
                  value={`${weather.main.humidity}%`}
                />
              </View>
              <IconButton
                iconName="chevron-right"
                title="5-day Forecast"
                onPress={navigateToWeeklyForecast}
              />
            </View>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </LinearGradient>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conditionsContainer: {
    alignItems: "center",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
})

export default HomeScreen
