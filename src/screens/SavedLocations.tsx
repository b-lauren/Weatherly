import React from "react"
import { Text, StyleSheet, View} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { observer, Reactive, useObservable } from "@legendapp/state/react"
import { store$ } from '../storage/storeFavourites';

export const SavedLocations = () => {
  const cities = store$.cities.get()

  console.log('testtt', cities);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D5A6C", "#1E9BA6", "#0D5A6C"]}
        style={{ flex: 1 }}
      >
        <Text>Your favourite locations</Text>
        {cities.map((city) => (<Text>{city}</Text>))}

      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5A6C",
  },
})
