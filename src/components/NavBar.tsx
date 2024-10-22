import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
//   GestureResponderEvent,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface NavBarProps {
  label: string
  iconName: keyof typeof Ionicons.glyphMap
  onLabelPress?: () => void 
  onIconPress?: () => void 
//   onIconPress?: (event: GestureResponderEvent) => void // Maybe need this gesture?
}

export const NavBar = ({
  label,
  iconName,
  onLabelPress,
  onIconPress,
}: NavBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={onLabelPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.6} onPress={onIconPress}>
        <Ionicons name={iconName} size={34} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  text: {
    color: "white",
    fontSize: 14,
    marginRight: 18,
  },
})

export default NavBar
