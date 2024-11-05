import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"

interface ForecastCardProps {
  day?: string
  date?: string
  month?: string
  temperature: number
  icon: string
}

const ForecastCard = ({
  day,
  date,
  month,
  temperature,
  icon,
}: ForecastCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.dateContainer}>
        <Text style={[styles.dayText, styles.text]}>{day}</Text>
        <Text style={styles.text}>
          {month} {date}
        </Text>
      </View>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        style={styles.icon}
      />
      <Text style={styles.temperature}>{temperature}°C</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#05142D",
    opacity: 0.6,
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dayText: {
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    flex: 1,
  },
  temperature: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
  },
})

export default ForecastCard
