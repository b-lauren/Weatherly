import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import Octicons from "@expo/vector-icons/Octicons"

interface IconButtonProps {
  iconName: keyof typeof Octicons.glyphMap
  title: string
  onPress: () => void
}

const IconButton = ({ title, iconName, onPress }: IconButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>{title}</Text>
    <Octicons name={iconName} size={20} color="#104FB6" style={styles.icon} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginLeft: 20,
    backgroundColor: "#FDD902",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    width: "48%",
  },
  text: {
    color: "#104FB6",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  icon: {
    marginLeft: 8,
  },
})

export default IconButton
