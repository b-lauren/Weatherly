import React from "react"
import { View, Text, StyleSheet } from "react-native"

interface CurrentConditionsCardProps {
  title: string
  value: number | string
}

const CurrentConditionsCard = ({
  title,
  value,
}: CurrentConditionsCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#353535D9",
    opacity: 0.9,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  title: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 8,
    textAlign: "center",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
})

export default CurrentConditionsCard
