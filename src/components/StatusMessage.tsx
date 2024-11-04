import React from "react"
import { Text, View, StyleSheet } from "react-native"

interface StatusMessageProps {
  title?: string
  subtitle?: string
}

const StatusMessage = ({
    title,
    subtitle,
}: StatusMessageProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.titleText]}>{title?.toUpperCase()}</Text>
      <Text style={[styles.text, styles.subtitleText]}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 40,
      },
      text: {
        color: "#FFF",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowRadius: 4,
      },
      titleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        letterSpacing: 1.2,
      },
      subtitleText: {
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 22,
      },
})

export default StatusMessage
