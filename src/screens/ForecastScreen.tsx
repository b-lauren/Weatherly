import React from "react"
import { Text, StyleSheet, View } from "react-native"

export const ForecastScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Weekly forecast screen!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5A6C",
  },
})
