import React from "react"
import { View, Text, StyleSheet } from "react-native"

interface ForecastCardProps {
  day: string
  date: string
  month: string
  description: string
  temperature: number
}

const ForecastCard = ({
  day,
  date,
  month,
  description,
  temperature,
}: ForecastCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.dateContainer}>
        <Text style={[styles.dayText, styles.text]}>{day}</Text>
        <Text style={styles.text}>
          {month} {date}
        </Text>
      </View>
      <Text style={[styles.description, styles.text]}>{description}</Text>
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
})

export default ForecastCard
