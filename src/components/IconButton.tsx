import React from "react"
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

interface IconButtonProps {
  iconName: keyof typeof AntDesign.glyphMap
  title: string
  onPress: () => void
}

const IconButton = ({ iconName, title, onPress }: IconButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <AntDesign name={iconName} size={24} color="white" />
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  text: {
    marginLeft: 8,
    color: "white",
    fontSize: 16,
  },
})

export default IconButton
