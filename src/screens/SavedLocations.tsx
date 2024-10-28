import React from "react"
import { Text, StyleSheet, View } from "react-native"

export const SavedLocations = () => {
  return (
    <View style={styles.container}>
      <Text>Your favourite locations</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5A6C",
  },
})
