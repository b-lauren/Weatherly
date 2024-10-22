import React from 'react';
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface WeatherBannerProps {
  location: string
  country: string
  temperature: number
  description: string
}

export const WeatherBanner = ({
  location,
  country,
  temperature,
  description,
}: WeatherBannerProps) => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.locationText}>
        {location}, {country}
      </Text>
      <Text style={styles.temperatureText}>{Math.floor(temperature)}°C</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      <Ionicons name="cloud" size={34} color="white" />
    </View>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: 30,
    backgroundColor: "#0D5A6C",
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
  descriptionText: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
})
