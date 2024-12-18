import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, StackActions } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../navigation/MainStack"

interface NavBarProps {
  currentRoute: string
}

export const NavBar = ({ currentRoute }: NavBarProps) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>()

  const isCitySearch = currentRoute === "CitySearch"
  const showSaved = currentRoute !== "SavedLocations"
  const showSearch = currentRoute !== "CitySearch"

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {navigation.canGoBack() && !isCitySearch && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.rightContainer}>
        {isCitySearch ? (
          <TouchableOpacity
            onPress={() => navigation.dispatch(StackActions.popToTop())}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        ) : (
          <>
            {showSaved && (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("SavedLocations")}
              >
                <Text style={styles.text}>Saved</Text>
              </TouchableOpacity>
            )}
            {showSearch && (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("CitySearch")}
              >
                <Ionicons name="add" size={34} color="white" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#0D5A6C",
    paddingTop: Platform.OS === "android" ? 60 : 0,
  },
  leftContainer: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 14,
    marginRight: 18,
  },
  backButton: {
    marginRight: "auto",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default NavBar
