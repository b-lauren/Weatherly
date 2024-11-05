import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
interface WeatherBannerProps {
  location: string
  country: string
  temperature: number
  description: string
  icon: string
}

const WeatherBanner = ({
  location,
  country,
  temperature,
  description,
  icon,
}: WeatherBannerProps) => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.locationText}>
        {location}, {country}
      </Text>
      <Text style={styles.temperatureText}>{Math.floor(temperature)}°C</Text>
      <View style={styles.descriptionContainer}>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
          style={styles.icon}
        />
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  locationText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  temperatureText: {
    color: "white",
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  descriptionText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  icon: {
    width: 50,
    height: 50,
  },
})

export default WeatherBanner
