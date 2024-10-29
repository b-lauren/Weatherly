import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, SafeAreaView } from "react-native"
import MainStackNavigator from "./src/navigation/MainStack"

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <MainStackNavigator />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5A6C",
  },
})
